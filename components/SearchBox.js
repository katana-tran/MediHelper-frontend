import React, {Component} from 'react'
import { connect } from 'react-redux'
import { TextInput, TouchableOpacity, Text, View, StyleSheet, Keyboard} from 'react-native';
import { setMedicationSearch } from '../redux/actions/medication.actions'
import { BASE_URL } from '../redux/actions/WorkingURL'

class SearchBox extends Component {
    constructor(){
        super()
        this.state = {
            searchTerm: ""
        }
    }

    handleTextChange = (text) => {
        this.setState((prevState) => ({
            ...prevState,
            searchTerm: text
        }), () => console.log(this.state))
    }

    handleSubmit = () => {
        console.log("Clicking on Search!", this.state.searchTerm)

        fetch(BASE_URL+'/get-medications',{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                search_term: this.state.searchTerm
            })
        })
        .then(res => res.json())
        .then(medications_json => {
            this.props.setMedicationSearch(medications_json)
        })
        .catch(err => {
            console.log("Error in Fetching Medications:", err)
            debugger
        })

    }

    render(){
        return(
            <View>
                <TextInput
                autoCapitalize="none" 
                onBlur={Keyboard.dismiss}
                onChangeText={text => this.handleTextChange(text)}
                value={this.state.search_term} 
                placeholder="Search for a new medication" 
                style={styles.input}
                />   
                <TouchableOpacity
                style={styles.saveButton}
                onPress={this.handleSubmit}
                >
                <Text style={styles.saveButtonText}>Go!</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMedicationSearch: medication_json => dispatch(setMedicationSearch(medication_json))
    }
}

const styles = StyleSheet.create({
    input: { 
        backgroundColor:"whitesmoke", 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        margin: 5
    },
    saveButton: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'gray',
        padding: 2,
        margin: 10
        },
    saveButtonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
        }
  })

  export default connect(null, mapDispatchToProps)(SearchBox)