import SearchBox from '../components/SearchBox'
import FilterBox from '../components/FilterBox'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Button, Text} from 'react-native-elements'
import { clearSearchResults } from '../redux/actions/medication.actions'

class SearchToFilterContainer extends Component {

    switchToSearch = () => {
        this.props.clearSearchResults()
        this.showSearchVsFilter()
    }

    showSearchVsFilter = () => {
        return this.props.resultsAvailable? 
        <View style={{marginBottom: 10}}>
            <View style={styles.fixToText}>
                <Text style={styles.text}>
                    Filter Results
                </Text>
                <Button buttonStyle={{backgroundColor: 'orange'}} containerStyle={{marginTop:15}} onPress={this.switchToSearch} title="Back to Search"/>
            </View>
            <FilterBox/>      
        </View> 
        : 
        <View style={styles.box} >
            <Text style={styles.searchText}>
                Medication Search
            </Text>
            <SearchBox/> 
            <Text style={{textAlign: 'center', fontSize: 15, color: 'white', marginTop: 25, marginBottom:20}}>Find your medication by generic or brand name, then you can filter by concentration, type, and medication name!</Text>     
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
      text: {
          color: 'white',
          fontSize: 40,
          padding: 10,
          marginTop: 8,
          marginBottom: 0,
          fontWeight: "500",
          fontSize: 35
      },
      searchText: {
        color: 'black',
        fontSize: 40,
        padding: 10,
        marginTop: 11,
        textAlign: 'center',
        fontWeight: "500",
        fontSize: 35
    },
      box: {
        shadowOffset:{  width: 5,  height: 5,  },
        shadowColor: '#474747',
        shadowOpacity: 0.8,
        width: 350,
        height: 190,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: '10%',
        marginBottom: 70
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