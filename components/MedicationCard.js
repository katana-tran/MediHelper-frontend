import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Button } from 'react-native-elements'
import MedicationModal from './MedicationModal'
import { connect } from 'react-redux'
import { BASE_URL } from '../redux/actions/WorkingURL'
import { setUserMedication } from '../redux/actions/medication.actions'


class MedicationCard extends Component{

    constructor(){
        super()
        this.state ={
          isVisible: true
        }
    }

    toggleModal = () => {
        this.setState({
            isVisible: false
        })
    }

    handleOnPress = () =>{
        fetch(BASE_URL+"/medications", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userID: 1,
                medication: this.props.medication
            })
        })
        .then(response => response.json())
        .then(user_medications => this.props.setUserMedication(user_medications))
    }

    modalView = () => {
        return this.state.isVisible? <MedicationModal onToggle={this.toggleModal}/> : null
    }
    
    render(){
        return(
            <>
            <View style={styles.view}>
                {/* {this.modalView()} */}
                <Button
                onPress={this.handleOnPress}
                type="outline"
                raised={true}
                icon={<MaterialCommunityIcons color="orange" name="pill"/>}
                />
                <Text>{this.props.medication.name}</Text>
            </View>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserMedication: user_medications => dispatch(setUserMedication(user_medications))
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

export default connect(null, mapDispatchToProps)(MedicationCard)