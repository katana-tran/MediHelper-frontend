import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MedicationCard from '../components/MedicationCard'

class MedicationsContainer extends Component {

    handleGenerateMedicationCards = () => {
        console.log(this.props.medications)
        let medications_array = this.props.medications?  this.props.medications : []

        return medications_array.map((medication,index) => <MedicationCard medication={medication} key={index}/>)

    }

    render(){
        return(
            <>
            <ScrollView 
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {this.handleGenerateMedicationCards()}
            </ScrollView>
            </>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return{
        medications: state.MedicationReducer.medications.medications_results
    }
}

const styles = StyleSheet.create({
    saveButton: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'gray',
        padding: 2,
        margin: 10
        },
    scrollView: {
        backgroundColor: 'white',
    }
})

export default connect(mapStateToProps)(MedicationsContainer)