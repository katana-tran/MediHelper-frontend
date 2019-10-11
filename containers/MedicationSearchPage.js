import React, {Component} from 'react'
import { TextInput, Text, View, StyleSheet} from 'react-native';
import SearchBox from '../components/SearchBox'
import MedicationsContainer from './MedicationsContainer';
import MedicationModal from '../components/MedicationModal'

class MedicationSearchPage extends Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.box} >
                    <Text style={styles.text}>
                        Medication Search
                    </Text>
                    <SearchBox/>      
                </View>
                    <MedicationModal/>
                    <Text style={styles.text}>
                        Results
                    </Text>
                    <MedicationsContainer/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
  })

  export default MedicationSearchPage