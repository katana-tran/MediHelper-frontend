import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import MedicationsContainer from '../containers/MedicationsContainer';
import { Text } from 'react-native-elements'
import ContraindicationButton from '../components/ContraindicationButton'
import ContraindicationsContainer from '../containers/ContraindicationsContainer';

export default function ManageMedicationScreen() {
  return (
    <View style={styles.container}>
        <Text h2 style={styles.title}>My Medications</Text>
        <Text style={{marginBottom: 10, color:'white', marginHorizontal:10}}>Check current medications and add a picture to them to remember what they looked like before taking your medication!</Text> 
        <MedicationsContainer/>
    </View>
  );
}

ManageMedicationScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007077',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    marginTop: 60,
    fontWeight: '500',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    marginBottom: 20
  }
})