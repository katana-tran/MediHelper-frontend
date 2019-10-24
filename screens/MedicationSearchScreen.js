import React, {Component} from 'react'
import { TextInput, Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import SearchBox from '../components/SearchBox'
import SearchContainer from '../containers/SearchContainer';
import SearchToFilterContainer from '../containers/SearchToFilterContainer';

export default function MedicationSearchScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
          <TextInput keyboardType='numeric'/>
        <View style={styles.container}>
          <SearchToFilterContainer/>
          <SearchContainer/>
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
  })