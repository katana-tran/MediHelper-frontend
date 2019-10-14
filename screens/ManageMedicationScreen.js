import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import MedicationsContainer from '../containers/MedicationsContainer';
import ContraindicationButton from '../components/ContraindicationButton'
import ContraindicationsContainer from '../containers/ContraindicationsContainer';

export default function ManageMedicationScreen() {
  return (
    <ScrollView style={styles.container}>
        <Text>My Medications</Text>
        <MedicationsContainer/>
        <ContraindicationButton/>
        <ContraindicationsContainer/>
    </ScrollView>
  );
}

ManageMedicationScreen.navigationOptions = {
  title: 'Manage',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
