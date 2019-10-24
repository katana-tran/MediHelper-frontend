import React, {Component} from 'react'
import { connect } from 'react-redux'
import { TextInput, TouchableOpacity, Text, View, StyleSheet, Keyboard} from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { SearchBar, Input } from 'react-native-elements'
import { setFilterTerm } from '../redux/actions/medication.actions'

class SearchBox extends Component {

    handleTextChange = (text) => {
        console.log(this.props.filterTerm)
        this.props.setFilterTerm(text)
    }

    render(){
        return(
            <View>
                <Input
                leftIcon={<AntDesign
                    name="search1"
                    size={18}
                  />}
                platform="ios"
                autoCapitalize="none" 
                onBlur={Keyboard.dismiss}
                onChangeText={text => this.handleTextChange(text)}
                value={this.props.filterTerm} 
                placeholder="Type to filter results" 
                style={styles.input}
                /> 
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFilterTerm: filterTerm => dispatch(setFilterTerm(filterTerm))
    }
}

const mapStateToProps = state => {
    return {
        filterTerm: state.MedicationReducer.filterTerm
    }
}

const styles = StyleSheet.create({
    input: { 
        backgroundColor:"whitesmoke", 
        height: 40, 
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
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
        },
        
  })

  export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)