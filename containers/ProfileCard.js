import { Card } from 'react-native-elements'
import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class ProfileCard extends Component{
    render(){
        return(
            <Card title={"Hey, " + this.props.user.name}>
            {
                <View>
                    <Text>You have SOME 
                    {/* {this.props.medications.length}  */}
                    medications.</Text>
                    <Text>Next Pharmacy Visit: 10/25/2019</Text>
                </View>
            }
            </Card>
        )
    }
}

const mapStateToProps = state => {
    console.log("state from medicationModal", state)
    return{
      user: state.UserReducer.user,
      medications: state.MedicationReducer.userMedications
    }
}

export default connect(mapStateToProps)(ProfileCard)