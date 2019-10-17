import React, { Component } from 'react'
import { Overlay, Button, Image } from 'react-native-elements'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { BASE_URL } from '../redux/actions/WorkingURL'
import { setUserMedication } from '../redux/actions/medication.actions'
import MyCamera from './MyCamera'

class MedicationInfoModal extends Component{
  constructor(){
    super()
    this.state = {
      showCamera: false,
      photoData: "",
      showImage: false
    }
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

  showCamera = () => {
    return this.state.showCamera? <MyCamera onPictureCaptured={this.setImage} ref={ref => {
      this.camera = ref;
    }} /> : null
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
    return this.state.showImage? <Image
      source={{ uri: this.state.photoData.uri }}
      style={{ width: 200, height: 200 }}/> : null
  }

  // showCapture = () => {
  //   return this.state.showCamera? <Button
  //   onPress={() => this.snapPicture.bind(this)}
  //   title="Capture"/> : null
  // }

  
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