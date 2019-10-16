
import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
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
            <Text>Signin by Facebook</Text>
            <AuthService signIn={this.signInAsync}/>
        </View>
    )}
}

AuthScreen.navigationOptions = {
  title: 'Facebook Signin',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 300,
    backgroundColor: '#fff',
  },
});

export default AuthScreen