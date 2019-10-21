import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import MedicationCard from '../components/MedicationCard'

class SearchContainer extends Component {

    showResultsTag = () => {
        return this.props.medications? 
        <View>
        <Text style={styles.text}>
            Results
        </Text>
         {this.areResultsPresent()}
        </View> : null
    }

    handleGenerateMedicationCards = () => {
        if (this.props.resultsAvailable) {
            console.log("results available, generating cards")
            let medicationsArray = this.props.medications?  this.props.medications : []
            // let newArray = medicationsArray.compact()
        
            return medicationsArray.map((medication, index) => 
                medication.name.toLowerCase().includes(this.props.filterTerm)? <MedicationCard medication={medication} key={index}/> : null
            )

        } else {
            console.log("generating cards results are NOT AVAILABLE", this.props.medications)
            let medicationsArray = this.props.medications?  this.props.medications : []

            return medicationsArray.map((medication,index) => <MedicationCard medication={medication} key={index}/>)
        }
    }

    areResultsPresent = () => {
        return this.props.resultsAvailable? <Text style={{fontStyle:'italic'}}>Displaying results for "{this.props.searchTerm}".</Text> : <Text style={{fontStyle:'italic'}}>No results were found for "{this.props.searchTerm}".</Text>
    }

    render(){
        return(
            <>
            {this.showResultsTag()}
            <ScrollView 
            directionalLockEnabled='true'
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
                <View>
                    {this.handleGenerateMedicationCards()}
                </View>
            </ScrollView>
            </>
        )
    }
}

const mapStateToProps = state => {
    console.log("from search container", state)
    return{
        medications: state.MedicationReducer.medications.medications_results,
        searchTerm: state.MedicationReducer.medications.search_term,
        resultsAvailable: state.MedicationReducer.medications.results_available,
        filterTerm: state.MedicationReducer.filterTerm
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
        margin: "5%"
    },
    text: {
        color: 'gray',
        fontSize: 24,
        padding: 10,
    }
})

export default connect(mapStateToProps)(SearchContainer)