import React, { Component } from 'react'
import { Overlay, Button } from 'react-native-elements'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { BASE_URL } from '../redux/actions/WorkingURL'
import { setUserMedication } from '../redux/actions/medication.actions'

class MedicationInfoModal extends Component{
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

  
  render(){
    return(
      <Overlay
      onBackdropPress={() => this.props.onToggle()}
      isVisible={true}>
          <Text>"Hello!!!!"</Text>
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