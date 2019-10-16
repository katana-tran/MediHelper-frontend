import React, { Component } from 'react'
import { Overlay, Button } from 'react-native-elements'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { BASE_URL } from '../redux/actions/WorkingURL'
import { setUserMedication } from '../redux/actions/medication.actions'

class MedicationModal extends Component{
  handleMedicationInfo = () => {
    this.props.onToggle()
    fetch(BASE_URL+"/medications", {
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

  
  render(){
    return(
      <Overlay
      animationType='slide'
      onBackdropPress={() => this.props.onToggle()}
      isVisible={true}>
          <Text>"Hello!!!!"</Text>
          <Button title="Add to My Medications" onPress={this.handleMedicationInfo}/>
      </Overlay>
    )
  }
}

const mapStateToProps = state => {
  console.log("state from medicationModal", state)
  return{
    user: state.UserReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserMedication: user_medications => dispatch(setUserMedication(user_medications))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicationModal)