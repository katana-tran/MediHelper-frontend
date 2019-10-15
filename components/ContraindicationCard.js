import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Button } from 'react-native-elements'

class ContraindicationCard extends Component{

    constructor() {
        super()
        this.state = {
            color: "green"
        }
    }

    componentWillMount(){
        let severity_color = this.props.contraindication.severity == "high"? "red" : "yellow"
        this.setState({
            color: severity_color
        })
    }

    render(){
        const { contraindication, firstDrug, secondDrug, severity} = this.props.contraindication
        return(
            <>
            <View style={styles.view}>
                <MaterialCommunityIcons color={this.state.color}name="pill"/>
                <Text>{firstDrug.name} and {secondDrug.name}</Text>
                <Text>{contraindication}</Text>
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

export default ContraindicationCard