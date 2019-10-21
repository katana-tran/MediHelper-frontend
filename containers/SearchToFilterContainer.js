import SearchBox from '../components/SearchBox'
import FilterBox from '../components/FilterBox'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { clearSearchResults } from '../redux/actions/medication.actions'

class SearchToFilterContainer extends Component {

    switchToSearch = () => {
        this.props.clearSearchResults()
        this.showSearchVsFilter()
    }

    showSearchVsFilter = () => {
        return this.props.resultsAvailable? 
        <View>
            <View style={styles.fixToText}>
            <Text style={styles.text}>
                Filter Results
            </Text>
            <Button onPress={this.switchToSearch} title="Back to Search"/>
            </View>
            <FilterBox/>      
        </View> 
        : 
        <View style={styles.box} >
            <Text style={styles.text}>
                Medication Search
            </Text>
            <SearchBox/>      
        </View>
    }

    render(){
        return(
            <>
            {this.showSearchVsFilter()}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        resultsAvailable: state.MedicationReducer.medications.results_available
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearSearchResults: () => dispatch(clearSearchResults())
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
          color: 'gray',
          fontSize: 24,
          padding: 10,
      },
      box: {
        width: 300,
        height: 150,
        backgroundColor: 'pink',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
      },
    saveButton: {
        borderWidth: 1,
        padding: 2,
        margin: 10
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        },
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchToFilterContainer)