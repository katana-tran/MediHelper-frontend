import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContraindicationCard from '../components/ContraindicationCard'
import { Text } from 'react-native'


class ContraindicationsContainer extends Component {

    constructor(){
        super()
        this.state = {
            showText: true
        }
    }
    createContraindicationCards = () => {
        let contraindications_array = this.props.contraindications?  this.props.contraindications : []

        return contraindications_array.map((contraindication, index) => <ContraindicationCard contraindication={contraindication} key={index}/>
        )
    }

    setShowText = () => {
        this.setState((prevState) => ({
            showText: true
        }), () => this.showText())
    }

    showText = () => {
        return this.state.showText? <Text>Press each pair to view possible contraindication. Please consult with your physician for advice on medication intake.</Text> : null
    }

    render () {
        return(
            <>
            {this.showText()}
            {this.createContraindicationCards()}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        contraindications: state.ContraindicationReducer.contraindications.interactions
    }
}

export default connect(mapStateToProps)(ContraindicationsContainer)