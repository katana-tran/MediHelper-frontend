import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { BASE_URL } from '../redux/actions/WorkingURL'
import { setUserMedication } from '../redux/actions/medication.actions'
import MedicationInfoCard from '../components/MedicationInfoCard'

class MedicationsContainer extends Component {

    handleGenerateMedicationCards = () => {
        console.log("generating medicine cards, medicationsContainer",this.props.usersMedications)
        let medications_array = this.props.usersMedications?  this.props.usersMedications : []

        return medications_array.map((medication,index) => <MedicationInfoCard medication={medication} key={index}/>)

    }

    componentWillMount = () => {
        console.log("about to fetch from componentDidMount in MedicationsContainer")
        fetch(BASE_URL + "/get-users-medications", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify ({
                userID: this.props.user.id
            })
        }).then(response => response.json())
        .then(user_medications => {
            this.props.setUserMedication(user_medications)
            this.handleGenerateMedicationCards()
        })
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
    console.log("state.MedicationReducer from medicationsContainer", state.MedicationReducer)
    return{
        usersMedications: state.MedicationReducer.usersMedications,
        user: state.UserReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return{
    setUserMedication: user_medications => dispatch(setUserMedication(user_medications))
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicationsContainer)