import React, {Component} from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'


class MedicationCard extends Component{

    render(){
        return(
            <>
            <Text>{this.props.medication.name}</Text>
            <TouchableOpacity 
            style={styles.medicationButton}>
            </TouchableOpacity>
            </>
        )
    }
}

const styles = StyleSheet.create({
    medicationButton: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 1,
        margin: 5
        }
})

export default MedicationCard