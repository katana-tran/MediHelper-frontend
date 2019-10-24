import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import MedicationsContainer from '../containers/MedicationsContainer';
import { Text } from 'react-native-elements'
import ContraindicationButton from '../components/ContraindicationButton'
import ContraindicationsContainer from '../containers/ContraindicationsContainer';

export default function ManageMedicationScreen() {
  return (
    <View>
        <Text h3 style={styles.title}>My Medications</Text>
        <MedicationsContainer/>
    </View>
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
  title: {
    textAlign: 'center'
  }
});
