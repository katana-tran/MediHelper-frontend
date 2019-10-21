import React from 'react';
import { Text, View, Button } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { BASE_URL } from '../redux/actions/WorkingURL'
import { setUser } from '../redux/actions/user.actions'
import { connect } from 'react-redux'

const YOUR_PUSH_TOKEN = 'ExponentPushToken[SB00n9EihukP4wTKHF88xW]';

class UserNotifications extends React.Component {
  state = {
    notification: {},
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
    //   this.updateUserToken(token)
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

//   componentWillUnmount () {
//       this.listener && Notifications.removeListe
//   }

  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

//Push Notification Tool-> https://expo.io/dashboard/notifications
  sendPushNotification = async () => {
    const message = {
      to: YOUR_PUSH_TOKEN,
      ios: {
        _displayInForeground: "true",
        sound: "true"
      },
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: '5 seconds later' },
    };

    const scheduling = {
        time: (new Date()).getTime() + 5000
        // repeat: 'minute'
    }

    Notifications.scheduleLocalNotificationAsync(message, scheduling)
    // Notifications.cancelAllScheduledNotificationsAsync()

    // Notifications.presentLocalNotificationAsync(message)
    // const response = await fetch('https://exp.host/--/api/v2/push/send', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Accept-encoding': 'gzip, deflate',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(message),
    // });
    // const data = response._bodyInit;
    // console.log(`Status & Response ID-> ${data}`);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Origin: {this.state.notification.origin}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
        </View>
        <Button
          title={'Press to Send Notification'}
          onPress={() => this.sendPushNotification()}
        />
      </View>
    );
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