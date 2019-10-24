
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Image } from 'react-native-elements'
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
        <Image
            source={{ uri: "https://i.stack.imgur.com/LOwyR.png" }}
            style={styles.Image}>
        <Text style={styles.title}>MediHelper</Text>
        <Text style={styles.titleText}>Your one-stop shop medication tracker</Text>
        {/* <Card style={styles.Card}>
            <Text h4 style={{fontFamily: 'Arial',}}>Signin by Facebook</Text> */}
            <View style={{marginHorizontal:35, marginTop: 16}}>
              <AuthService signIn={this.signInAsync}/>
            </View>
        {/* </Card> */}
        </Image>
      </View>
    )}
}

AuthScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  Image: { 
    width: '100%', 
    height: '100%', 
    flexDirection: 'column', 
    justifyContent: 'center' 
  },
  Card: { 
    height: '50%',
    color: '#005b96', 
    borderRadius: 5
  },
  container: {
    flex: 1,
    // backgroundColor: '#005b96',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    color: "white",
    textShadowColor: 'white',
    textAlign: 'center',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10, 
    fontFamily: 'Arial',
    fontSize: 70
  },
  titleText: {
    color: "white",
    textShadowColor: 'white',
    textAlign: 'center',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10, 
    fontFamily: 'Arial',
    fontSize: 18
  },
});

export default AuthScreen