import { MonoText } from '../components/StyledText';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements'
import React, { Component } from 'react'

export default class InfoBox extends Component {
    constructor(){
        super()
        this.state = {
            infoBoxVisible: true
        }
    }

    dismissInfoBox = () => {
        this.setState({
            infoBoxVisible: false
        }, () => this.infoBox)
    }

    infoBox = () => {
        return this.state.infoBoxVisible? 
        <TouchableOpacity onLongPress={() => this.dismissInfoBox()} style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          {this.props.text}
        </Text>
        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>
            Dismiss me by long pressing me!
          </MonoText>
        </View>
      </TouchableOpacity> 
      :
        null
    }

    render(){
        return(
            <>
            {this.infoBox()}
            </>
        )
    }
}

const styles = StyleSheet.create({
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 15,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    }
})