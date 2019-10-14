import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContraindicationCard from '../components/ContraindicationCard'


class ContraindicationsContainer extends Component {

    createContraindicationCards = () => {
        let contraindications_array = this.props.contraindications?  this.props.contraindications : []

        return contraindications_array.map((contraindication, index) => <ContraindicationCard contraindication={contraindication} key={index}/>
        )
    }

    render () {
        return(
            <>
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