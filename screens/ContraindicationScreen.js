import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ContraindicationButton from '../components/ContraindicationButton'
import { Text } from 'react-native-elements'
import ContraindicationsContainer from '../containers/ContraindicationsContainer';

export default function ContraindicationScreen() {
  return (
    <View style={styles.container}>
        <Text h3 style={styles.title}>Contraindications</Text>
        <Text style={styles.caution}>By clicking the button below, you recognize that these contraindications may not encompass all possible conflicts nor exclude non-hazardous conflicts. Please consult with your healthcare provider for further advice on your medication intake. </Text>
        <ContraindicationButton/>
        <ContraindicationsContainer/>
    </View>
  );
}

ContraindicationScreen.navigationOptions = {
  title: 'Conflicts',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  caution: {
    marginLeft: 8,
    marginBottom: 10,
    marginTop: 10
  },
  title: {
    textAlign: 'center'
  }
});