import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContraindicationButton from '../components/ContraindicationButton'
import { Text } from 'react-native-elements'
import ContraindicationsContainer from '../containers/ContraindicationsContainer';
import InfoBox from '../components/InfoBox';

export default function ContraindicationScreen() {
  return (
    <View style={styles.container}>
        <Text h3 style={styles.title}>Contraindications</Text>
        <Text style={styles.caution}>By clicking the button below, you recognize that these contraindications may not encompass all possible conflicts nor exclude non-hazardous conflicts. Please consult with your healthcare provider for further advice on your medication intake. </Text>
        <ContraindicationButton/>
        <ContraindicationsContainer/>
        <InfoBox text="Press each pair to view possible contraindication."/>
    </View>
  );
}

ContraindicationScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 15,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:50 
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