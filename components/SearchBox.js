import React, {Component} from 'react'
import { connect } from 'react-redux'
import { SearchBar, Input } from 'react-native-elements'
import { TextInput, TouchableHighlight, Text, View, StyleSheet, Keyboard} from 'react-native';
import { setMedicationSearch } from '../redux/actions/medication.actions'
import { AntDesign } from '@expo/vector-icons'
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
        }))
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
        .then(medications_results => {
            this.props.setMedicationSearch(medications_results)
        })
        .catch(err => {
            console.log("Error in Fetching Medications:", err)
        })

    }

    render(){
        return(
            <View>
                <Input
                leftIconContainerStyle={{marginRight: 7, marginLeft:-1}}
                leftIcon={<AntDesign
                    name="search1"
                    size={20}
                    style={{marginRight: 1}}
                  />}
                autoCapitalize="none" 
                onBlur={Keyboard.dismiss}
                onChangeText={text => this.handleTextChange(text)}
                value={this.state.search_term} 
                placeholder="Search for a new medication" 
                style={styles.input}
                />   
                <TouchableHighlight
                style={styles.saveButton}
                onPress={this.handleSubmit}
                >
                    <Text style={styles.saveButtonText}>Go!</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMedicationSearch: medications_results => dispatch(setMedicationSearch(medications_results))
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
        borderColor: 'orange',
        backgroundColor: 'orange',
        padding: 2,
        marginHorizontal: 10,
        marginTop: 20,
        borderRadius: 5
        },
    container: {
        borderWidth: 1
    },
    saveButtonText: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center'
        }
  })

  export default connect(null, mapDispatchToProps)(SearchBox)