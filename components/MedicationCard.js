import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Button } from 'react-native-elements'
import MedicationModal from './MedicationModal'

class MedicationCard extends Component{

    constructor(){
        super()
        this.state ={
          isVisible: false
        }
    }

    toggleModal = () => {
        this.setState({
            isVisible: false
        })
    }

    handleOnPress = () =>{
        this.setState({
            isVisible: true
        })
    }

    modalView = () => {
        return this.state.isVisible? <MedicationModal medication={this.props.medication} onToggle={this.toggleModal}/> : null
    }
    
    render(){
        return(
            <>
            <View style={styles.view}>
                {this.modalView()}
                <Button
                onPress={this.handleOnPress}
                type="outline"
                raised={true}
                icon={<MaterialCommunityIcons color="orange" name="pill"/>}
                />
                <Text>{this.props.medication.name}</Text>
            </View>
            </>
        )
    }
}



const styles = StyleSheet.create({
    view: {
        flex:1,
        flexDirection:'row'
    },
    medicationButton: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 1,
        margin: 5
    }
})

export default MedicationCard