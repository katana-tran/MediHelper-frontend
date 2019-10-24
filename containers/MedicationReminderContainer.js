import { Card, ListItem } from 'react-native-elements'
import React, {Component} from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import { connect } from 'react-redux'
import { setUserMedication } from '../redux/actions/user.actions'
import { BASE_URL } from '../redux/actions/WorkingURL'

class MedicationReminderContainer extends Component{
    
    updateDosage = (medication) => {
      console.log(medication)
      fetch(BASE_URL+ '/update-medication-dosage', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            user_id: this.props.user.id,
            medication: medication
        })
    })
    .then(res => res.json())
    .then(user_medications => this.props.setUserMedication(user_medications))
    .catch(err => console.log("Error in medication reminder:", err))
    }

    alertDosageChange = (medication) => {
      Alert.alert(
        'Take Medication',
        `Would you like to take ${medication.name} now?`,
        [
          {text: 'Take now', 
           onPress: () => this.updateDosage(medication),
           style: 'default'
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          }
        ],
        {cancelable: true},
      );
    }

    render(){
        return(
            <ScrollView style={{marginHorizontal:15, marginTop: 5}}>
            {
                this.props.usersMedications.map((medication, i) => (
                <ListItem
                onPress={() => this.alertDosageChange(medication)}
                key={i}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                linearGradientProps={{
                  colors: ['#FF9800', '#F44336'],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                leftAvatar={{ rounded: true, source: medication.img_uri === ""? {uri: "https://www.dosepharmacy.com/media/catalog/product/cache/1/small_image/300x300/9df78eab33525d08d6e5fb8d27136e95/placeholder/default/Placeholder_1.jpg"} : {uri: medication.img_uri}
              
              }}
                title={medication.name}
                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'white' }}
                subtitle={`Dosages Remaining: ${medication.dosages_left}`}
                chevron={{ color: 'white' }}
                    // key={i}
                    // leftAvatar={{ source: { uri: l.avatar_url } }}
                    // title={l.name}
                    // subtitle={l.subtitle}
                    // bottomDivider
                />
                ))
            }
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
  return {
    user: state.UserReducer.user,
    usersMedications: state.UserReducer.usersMedications
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserMedication: user_medications => dispatch(setUserMedication(user_medications))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MedicationReminderContainer)