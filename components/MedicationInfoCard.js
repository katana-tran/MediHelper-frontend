import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Button } from 'react-native-elements'


class MedicationInfoCard extends Component{

    render(){
        return(
            <>
            <View style={styles.view}>
                <Button
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

export default MedicationInfoCard