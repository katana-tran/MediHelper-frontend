import React, {Component} from 'react'
import { TextInput, Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import SearchBox from '../components/SearchBox'
import MedicationsContainer from '../containers/MedicationsContainer';
import MedicationModal from '../components/MedicationModal'

export default function MedicationSearchScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{flex: 1}}>
        <TextInput keyboardType='numeric'/>
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
    </View>
</TouchableWithoutFeedback>
  );
}

MedicationSearchScreen.navigationOptions = {
  title: 'Search',
};

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
    }
  })