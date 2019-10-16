import React from 'react';
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'

export default function ProfileScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  signOutAsync = () => {
    // await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Auth');
  };

  return (
  <View>
    <Button
      onPress={() => this.signOutAsync()} 
      icon={
          <FontAwesome size={25} color="white" name="facebook-official"/>
      }
      iconLeft
      title="Signout"
    />
  </View>
  )

}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};
