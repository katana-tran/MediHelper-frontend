import React, { Component } from 'react'
import { setContraindicationSearch } from '../redux/actions/contraindication.actions'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { BASE_URL } from '../redux/actions/WorkingURL'

class ContraindicationButton extends Component {

    handleGetContraindications = () => {
        fetch(BASE_URL+'/get-contraindications', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                user_id: 1
            })
        })
        .then(res => res.json())
        .then(contraindication_json => this.props.setContraindicationSearch(contraindication_json))
        .catch(err => console.log("Error in fetchContraindicationSearch:", err))
    }

    render () {
        return (
            <Button 
            type="outline"
            title="Show Contraindications"
            onPress={() => this.handleGetContraindications()}/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
    setContraindicationSearch: contraindication_results => dispatch(setContraindicationSearch(contraindication_results))
    }
}

export default connect(null, mapDispatchToProps)(ContraindicationButton)