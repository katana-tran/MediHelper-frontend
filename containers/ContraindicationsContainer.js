import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContraindicationCard from '../components/ContraindicationCard'
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from 'react-native'


class ContraindicationsContainer extends Component {

    constructor(){
        super()
        this.state = {
            showText: true
        }
    }
    createContraindicationCards = () => {
        let contraindications_array = this.props.contraindications?  this.props.contraindications.reverse() : []
        
        return contraindications_array.map((contraindication, index) => 
        {
        //  return <Text>{contraindication.contraindication}</Text>}
            return <ContraindicationCard contraindication={contraindication} key={index}/>}
        )
    }

    setShowText = () => {
        this.setState((prevState) => ({
            showText: true
        }), () => this.showText())
    }

    showText = () => {
        return this.state.showText? <Text style={{textAlign: 'center', marginTop:10 }}>Press each pair to view possible contraindication.</Text> : null
    }

    render () {
        return(
                <ScrollView style={styles.scrollView}>
                    {this.createContraindicationCards()}
                </ScrollView>
        )
    }
}

// {this.showText()}

const mapStateToProps = state => {
    return {
        contraindications: state.ContraindicationReducer.contraindications.interactions
    }
}

const styles = StyleSheet.create({
    // ScrollView: {
    //     
    //     marginLeft: 5,
    //     marginRight: 5
    // },

    scrollView: {
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 20
    },
});

export default connect(mapStateToProps)(ContraindicationsContainer)