import React, {Component} from 'react'
import { TextInput, Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import SearchContainer from '../containers/SearchContainer';
import SearchToFilterContainer from '../containers/SearchToFilterContainer';
import InfoBox from '../components/InfoBox';

export default function MedicationSearchScreen() {
  return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <View style={{
                  alignItems: 'center',
                  marginTop: 30,
                  marginBottom: 20,
                }}>
                </View>
                <SearchToFilterContainer/>
              </View>
          </TouchableWithoutFeedback>
            <SearchContainer/>
            <InfoBox text="Search for your medications here"/>
        </View>
  );
}

MedicationSearchScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#007077',
      flex: 1,
      alignItems: 'center',
    },
  })