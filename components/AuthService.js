import * as Facebook from 'expo-facebook';
import React, {Component} from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { BASE_URL } from '../redux/actions/WorkingURL'
import { connect } from 'react-redux'
import { setUser } from '../redux/actions/user.actions'

class AuthService extends Component {

    getUserData = (id, token) => {
        return fetch(`https://graph.facebook.com/${id}?fields=name,id,picture.type(large),email%20&access_token=${token}`)
        .then(response => response.json())
        .then(user_json => this.sendUserDataBackend(user_json))
    }

    sendUserDataBackend = (userData) => {
        console.log("sending BACK", userData)
        return fetch(BASE_URL + "/users",{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userData: userData
            })
        })
        .then(response => response.json())
        .then(user_json => {
            console.log(user_json)
            this.props.setUser(user_json)
        })
    }

    async FacebookLogin() {
        console.log("yes")
        try {
        const {
            type, 
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync('528529677714454', {
            permissions: ['public_profile','email'],
            behavior: 'web'
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`).then(response => response.json()).then(response => this.getUserData(response.id,token))

            alert('Logged in!');
        } else {
            alert('Please sign in to continue!')
        }
        } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
        }
    }

    render(){
        return (
        <>
        <TouchableOpacity
            onPress={() => this.FacebookLogin()} 
            style={styles.medicationButton}>
                <Text>Facebook</Text>
        </TouchableOpacity>
        </>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex:1,
        flexDirection:'row'
    },
    medicationButton: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 1,
        margin: 5
    }
})

const mapDispatchToProps = dispatch =>{
    return{
        setUser: userData => dispatch(setUser(userData))
    }
}

export default connect(null, mapDispatchToProps)(AuthService)