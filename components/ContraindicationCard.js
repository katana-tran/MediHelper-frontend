import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Button, Tooltip } from 'react-native-elements'

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
        const { contraindication, firstDrug, secondDrug } = this.props.contraindication
        return(
            <Tooltip height={100} width={300} backgroundColor={this.state.color} popover={<Text>{contraindication}</Text>}>
                <View>
                    <MaterialCommunityIcons color={this.state.color}name="pill"/>
                    <Text>{firstDrug.name} and {secondDrug.name}</Text>
                </View>
            </Tooltip>
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