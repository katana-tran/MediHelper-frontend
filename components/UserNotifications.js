import React from 'react';
import { Text, View, Button } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { BASE_URL } from '../redux/actions/WorkingURL'
import { setUser } from '../redux/actions/user.actions'
import { connect } from 'react-redux'

class UserNotifications extends React.Component {
  state = {
    notification: {}
  };

  updateUserToken = (token) => {
    console.log(token)
    fetch(BASE_URL+'/add-token-to-user-data',{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token,
            userID: this.props.user.id
        })
    })
    .then(response => response.json())
    .then(updated_user => {
        this.props.setUser(updated_user)
    })
    .catch(err => {
        console.log("Error in updating notification token:", err)
    })
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Enable notifications in your phone settings to receive notifications!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.updateUserToken(token)
    } else {
      alert('Must use a physical device for Push Notifications');
    }
  };

  componentDidMount() {
    let myDate = new Date()
    console.log(myDate.toLocaleString())
    this.registerForPushNotificationsAsync();

    this.listener = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  render(){
    return(
      <>
      </>
    )
  }
}

const mapDispatchToProps = dispatch =>{
    return {
      setUser: updated_user_data => dispatch(setUser(updated_user_data))
    }
}

const mapStateToProps = state => {
    return {
      user: state.UserReducer.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNotifications)