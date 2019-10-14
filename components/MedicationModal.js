import React, { Component } from 'react'
import { Overlay } from 'react-native-elements'
import { Text } from 'react-native'

class MedicationModal extends Component{
  render(){
    return(
      <Overlay
        isVisible={true}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor="red"
        width="auto"
        onBackdropPress={this.props.onToggle()}
        height="auto">
          <Text>"Hello!!!!"</Text>
      </Overlay>
    )
  }
}

export default MedicationModal