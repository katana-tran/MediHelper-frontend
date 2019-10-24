import { Card, Avatar, ListItem, Text } from 'react-native-elements'
import React, {Component} from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { BASE_URL } from '../redux/actions/WorkingURL'
import { setUserMedication } from '../redux/actions/user.actions'

class ProfileCard extends Component{

    componentWillMount () {
        console.log("about to fetch from componentDidMount in MedicationsContainer")
        fetch(BASE_URL + "/get-users-medications", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify ({
                userID: this.props.user.id
            })
        }).then(response => response.json())
        .then(user_medications => {
            console.log("profile card", user_medications)
            this.props.setUserMedication(user_medications)
        })
    }

    render(){
        return(
            <Card 
            containerStyle={styles.cardStyle}
            title={ 
                <ListItem
                containerStyle={{marginTop: -5}}
                leftAvatar={{
                    source: { uri: this.props.user.img_url }
                }}
                title={<Text h2>Hey, {this.props.user.name.split(" ")[0]}</Text>}
                />}>
            {
                <View>
                    <Text>You have <Text color="green">{this.props.medications.length} </Text>
                    medications.</Text>
                    <Text>Next Pharmacy Visit: 10/25/2019</Text>
                </View>
            }
            </Card>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
    setUserMedication: user_medications => dispatch(setUserMedication(user_medications))
    }
}

const mapStateToProps = state => {
    console.log("state from medicationModal", state)
    return{
      user: state.UserReducer.user,
      medications: state.UserReducer.usersMedications
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        shadowOffset:{  width: 5,  height: 5,  },
        shadowColor: '#474747',
        shadowOpacity: 0.8,
        borderRadius: 10,
        marginTop: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard)