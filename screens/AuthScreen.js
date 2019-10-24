
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-elements'
import AuthService from '../components/AuthService'

class AuthScreen extends React.Component {
    signInAsync = () => {
        // await AsyncStorage.setItem('userToken', 'abc');
        console.log("CALLED", this.props)
        this.props.navigation.navigate('Main');
    };

    render(){
    return (
      <View style={styles.container}>
        <Card>
            <Text h2 style={{fontFamily: 'Arial',}}>Signin by Facebook</Text>
            <AuthService signIn={this.signInAsync}/>
        </Card>
      </View>
    )}
}

AuthScreen.navigationOptions = {
  title: 'Facebook Signin',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005b96',
    flexDirection: 'column',
    justifyContent: 'center'
  },
});

export default AuthScreen