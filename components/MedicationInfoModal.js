import React, { Component } from 'react'
import { Overlay, Button, Image, Avatar, Card, Icon } from 'react-native-elements'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { BASE_URL } from '../redux/actions/WorkingURL'
import { setUserMedication } from '../redux/actions/user.actions'
import MyCamera from './MyCamera'
import { FontAwesome } from '@expo/vector-icons'

class MedicationInfoModal extends Component{
  constructor(){
    super()
    this.state = {
      showCamera: false,
      photoData: "",
      showImage: false,
      showEnlargedImage: false
    }
  }

  showMedicationImage = () => {
    console.log(this.props.medication)
    return this.props.medication.img_uri == ""? null : 
    <Avatar
    size="xlarge"
    source={{
      uri: this.props.medication.img_uri,
    }}
    showEditButton
    />
  }
  
  handleDeleteMedicationInfo = () => {
    this.props.onToggle()
    fetch(BASE_URL+"/delete-medication", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userID: this.props.user.id,
            medication: this.props.medication
        })
    })
    .then(response => response.json())
    .then(user_medications => this.props.setUserMedication(user_medications))
  }

  showEnlargedImage = () => {
      return this.state.showEnlargedImage?
      <Overlay
        height="60%"
        width="90%"
        onBackdropPress={() => this.setStateEnlargedImage()}
        isVisible={true}>
        <Image
          source={this.props.medication.img_uri === ""? {uri:"https://www.dosepharmacy.com/media/catalog/product/cache/1/small_image/300x300/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/Placeholder_1.jpg"} : {uri:this.props.medication.img_uri}}
          style={{ width: '100%', height: '90%' }}
        />
        <Button title="Back" onPress={() => this.setStateEnlargedImage()}/>
      </Overlay> :
      null
  }

  setStateEnlargedImage = () => {
    this.setState((prevState) => ({
      ...prevState,
      showEnlargedImage: false
    }), () => this.showEnlargedImage())
  }

  showCamera = () => {
    return this.state.showCamera? <MyCamera onPictureCaptured={this.setImage} ref={ref => {
      this.camera = ref;
    }} /> : <TouchableOpacity
    onPress={() => this.setState((prevState) => ({
      ...prevState,
      showEnlargedImage: true
    }), () => console.log(this.state))}>
      <Card
    title={this.props.medication.name}
    image={this.props.medication.img_uri === ""? {uri:"https://www.dosepharmacy.com/media/catalog/product/cache/1/small_image/300x300/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/Placeholder_1.jpg"} : {uri:this.props.medication.img_uri}}>
    <Text 
    // style={{marginBottom: 10}}
    >
      Remaining Dosages: {this.props.medication.remaining_doses}
    </Text>
    <Text>Remind me: {this.props.medication.repeat_time.toLowerCase()} time(s) {this.props.medication.repeat_days.toLowerCase()}</Text>
  </Card>
  </TouchableOpacity>
  }

  setImage = (photoData) =>{
    this.setState({
      photoData: photoData,
      showImage: true
    }, () => {
      this.showImage(),
      console.log(this.state)
    })
  }

  showImage = () => {
    return this.state.showImage? 
      <View> 
      <Text>Tentative photo for your medication:</Text>
      <Image
      source={{ uri: this.state.photoData.uri }}
      style={{ width: 200, height: 200 }}/>
      <Button buttonStyle={{width: 100}} icon={<FontAwesome color="white" size={15} name="save"/>}
      onPress={this.modifyMedicationImage} title="Save"/>
      </View>
      : null
  }

  toggleImage = () => {
    this.setState((prevState)=>({
      ...prevState,
      showImage: !prevState.showImage
    }), () => this.showImage())
  }
  modifyMedicationImage = () => {
    this.toggleCamera()
    this.toggleImage()
    fetch(BASE_URL+"/change-medication-image", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userID: this.props.user.id,
            medication: this.props.medication,
            photoData: this.state.photoData
        })
    })
    .then(response => response.json())
    .then(user_medications => {
      this.showMedicationImage()
      this.props.setUserMedication(user_medications)})
  }
  
  toggleCamera = () => {
    this.setState((prevState) => ({
      showCamera: !this.state.showCamera
    }), () => {
      this.showCamera()
      this.showImage()
      // this.showCapture()
    })
  }

  render(){
    return(
      <Overlay
      animationType="slide"
      onBackdropPress={() => this.props.onToggle()}
      isVisible={true}>

          {/* {this.showMedicationImage()} */}
          {this.showEnlargedImage()}
          {this.showCamera()}
          <Button title={this.state.showCamera? "Hide Camera" : "Show Camera"} onPress={() => this.toggleCamera()}/>

          {this.showImage()}

          <Button title="Delete this Medication" onPress={this.handleDeleteMedicationInfo}/>
      </Overlay>
    )
  }
}

const mapStateToProps = state => {
    console.log("state from medicationInfoModal", state)
    return{
        user: state.UserReducer.user
    }
}

const mapDispatchToProps = dispatch => {
  return {
      setUserMedication: user_medications => dispatch(setUserMedication(user_medications))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicationInfoModal)