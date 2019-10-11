import React, { Component } from 'react';
import { Text, View, StyleSheet, AppRegistry, TouchableOpacity} from 'react-native';
import FBSDK, { LoginManager } from 'react-native-fbsdk';

export default class FacebookLogin extends Component{
    handleFacebookLogin() {
        LoginManager.logInWithPermissions(['public_profile']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled')
                } else {
                    console.log('Login success with permissions: ' + result.grantedPermissions.toString())
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error)
            }
        )
    }

	render(){
		return(
			<View style={styles.container} >
                <TouchableOpacity 
                onPress={() => this.handleFacebookLogin()}
                style={styles.saveButton}
                >
					<Text style={styles.saveButtonText}>Facebook Login</Text>
				</TouchableOpacity>
            </View>
        );
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#F5FCFF'
    },
    saveButton: {
        borderWidth: 1,
        borderColor: 'burlywood',
        backgroundColor: 'burlywood',
        padding: 2,
        margin: 10
    },
    saveButtonText: {
        color:"white"
    }
});