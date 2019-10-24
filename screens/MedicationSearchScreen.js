import React, {Component} from 'react'
import { TextInput, Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import SearchBox from '../components/SearchBox'
import SearchContainer from '../containers/SearchContainer';
import SearchToFilterContainer from '../containers/SearchToFilterContainer';

export default function MedicationSearchScreen() {
  return (
        <View onPress={Keyboard.dismiss} style={styles.container}>
          <SearchToFilterContainer/>
          <SearchContainer/>
        </View>
  );
}

MedicationSearchScreen.navigationOptions = {
  title: 'Search',
};

const styles = StyleSheet.create({
    container: {
      marginTop:8,
      flex: 1,
      alignItems: 'center',
    },
  })