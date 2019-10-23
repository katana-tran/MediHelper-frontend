import React, { Component } from 'react'
import { Overlay, Button, Card } from 'react-native-elements'
import { Text, Picker, TextInput, DatePickerIOS, View, StyleSheet, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { BASE_URL } from '../redux/actions/WorkingURL'
import { setUserMedication } from '../redux/actions/user.actions'
import * as userNotifications from '../utility/NotifyUserUtility'

class MedicationModal extends Component{

  constructor(){
    super()
    this.state = {
      dosesRemaining: "",
      amountUsedPerDose: "",
      notificationStartDate: new Date(new Date().getTime() + 3600000),
      repeatIntervalTime: "One",
      repeatIntervalDays: "Daily",
      showDateTimePicker: false,
      showFrequencyPicker: false
    }
  }

  screenMedicationsForDuplicates = () => {
    let duplicationArray = this.props.usersMedications.map((medication) => {
      return medication.name === this.props.medication.name? true : false
    })
    duplicationArray.includes(true)? alert("You've already added this medication.") : this.handleMedicationInfo
  }

  handleMedicationInfo = () => {
    this.props.onToggle()
    fetch(BASE_URL+"/medications", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userID: this.props.user.id,
            medication: this.props.medication,
            dosesRemaining: this.state.dosesRemaining,
            amountUsedPerDose: this.state.amountUsedPerDose,
            notificationStartDate: this.state.notificationStartDate,
            repeatIntervalTime: this.state.repeatIntervalTime,
            repeatIntervalDays: this.state.repeatIntervalDays
        })
    })
    .then(response => response.json())
    .then(user_medications => {
      this.props.setUserMedication(user_medications)
      userNotifications.calculateAmountOfNotifications(this.props.medication, this.props.user.token, this.state.notificationStartDate, this.state.repeatIntervalTime, this.state.repeatIntervalDays)
    })    
  }

  handleDosesRemainingText = text => {
    this.setState((prevState) => ({
      ...prevState,
      dosesRemaining: text
    }))
  }

  handleAmountPerDoseText = text => {
    this.setState((prevState) => ({
      ...prevState,
      amountUsedPerDose: text
    }))
  }

  changeNotificationStartDate = date => {
    console.log(date)
    this.setState((prevState) => ({
      ...prevState,
      notificationStartDate: date
    }))
  }

  showDateTimePicker = () => {
    console.log(this.state)
    return this.state.showDateTimePicker?
    <Overlay
      height="40%"
      width="90%"
      onBackdropPress={() => this.setStateStartTimePicker()}
      isVisible={true}>
        <Text>When would you like to start receiving notifications?</Text>
        <DatePickerIOS
          mode="datetime"
          date={this.state.notificationStartDate}
          minimumDate={new Date(new Date().getTime() + 3600000)}
          maximumDate={new Date(2020, 1, 1)}
          initialDate={new Date(new Date().getTime() + 3600000)}
          onDateChange={date => this.changeNotificationStartDate(date)} />
        <Button 
        title="Save Date" 
        onPress={() => this.setStateStartTimePicker()}/>
      </Overlay>
      :
      null
  }

  showTimesADayPicker = () => {
    return this.state.showTimesADayPicker?
    <Overlay
      height="40%"
      width="90%"
      onBackdropPress={() => this.setStateTimesADayPicker()}
      isVisible={true}>
        <Text>How many times per day will you take this medication?</Text>
        <View>
          <Picker
            selectedValue={this.state.repeatIntervalTime}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({repeatIntervalTime: itemValue})
            }>
            <Picker.Item label="Once" value="One" />
            <Picker.Item label="Twice" value="Two" />
            <Picker.Item label="Three times" value="Three" />
            <Picker.Item label="Four times" value="Four" />
          </Picker>
        </View>
      <Button 
        title="Save Frequency" 
        onPress={() => this.setStateTimesADayPicker()}/>
    </Overlay> :
    null
  }

  showFrequencyPicker = () => {
    return this.state.showFrequencyPicker?
    <Overlay
      height="40%"
      width="90%"
      onBackdropPress={() => this.setStateFrequencyPicker()}
      isVisible={true}>
        <Text>How often will you take this medication?</Text>
        <View>
          <Picker
            selectedValue={this.state.repeatIntervalDays}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({repeatIntervalDays: itemValue})
            }>
            <Picker.Item label="Weekly" value="Weekly" />
            <Picker.Item label="Daily" value="Daily" />
            <Picker.Item label="Monthly" value="Monthly" />
          </Picker>
        </View>
      <Button 
        title="Save Frequency" 
        onPress={this.setStateFrequencyPicker}/>
    </Overlay> :
    null
  }
  
  setStateStartTimePicker = () => {
    this.setState((prevState) => ({
      ...prevState,
      showDateTimePicker: false
    }), () => this.showDateTimePicker())
  }

  setStateTimesADayPicker = () => {
    this.setState((prevState) => ({
      ...prevState,
      showTimesADayPicker: false
    }), () => this.showTimesADayPicker())
  }

  setStateFrequencyPicker = () => {
    this.setState((prevState) => ({
      ...prevState,
      showFrequencyPicker: false
    }), () => this.showFrequencyPicker())
  }

  render(){
    return(
      <Overlay
      height="90%"
      width="90%"
      onPress={() => this.setStateTimePicker()}
      animationType='slide'
      onBackdropPress={() => this.props.onToggle()}
      isVisible={true}>
        <Card
          title={this.props.medication.name}>
          <Text>Alternate Name: {this.props.medication.synonym}</Text>
          <Text>Type: {this.props.medication.type}</Text>
        </Card>          

          {/* Calculating the amount of dosages remaining before the next needed refill by amt pills/etc remaining/dose */}
          <Text>Amount of capsules/applications/syringes remaining:</Text>
          <TextInput
              autoCapitalize="none" 
              onBlur={Keyboard.dismiss}
              onChangeText={text => this.handleDosesRemainingText(text)}
              value={this.state.dosesRemaining} 
              placeholder="amount remaining" 
              style={styles.input}/>   
            
          <Text>Amount of capsules/applications/syringes per dose: </Text>
          <TextInput
              autoCapitalize="none" 
              onBlur={Keyboard.dismiss}
              onChangeText={text => this.handleAmountPerDoseText(text)}
              value={this.state.amountUsedPerDose} 
              placeholder="usage/dose" 
              style={styles.input}/>  
          
          {/* Date Picker for when the user wants the first notification to pop up and the subsequent time they will pop up each day. */}
          <Text>Start Notifications At: (Tap date to change)</Text>
          <Text 
            onPress={() => this.setState((prevState) => ({
              ...prevState,
              showDateTimePicker: true
            }))}>{this.state.notificationStartDate.toString()}</Text>
          {this.showDateTimePicker()}

          <Text>How many times daily would you like reminders?: (Tap date to change)</Text>
          <Text 
              onPress={() => this.setState((prevState) => ({
                ...prevState,
                showTimesADayPicker: true
              }))}>{this.state.repeatIntervalTime} time(s) a day.</Text>
            {this.showTimesADayPicker()}

          {/* Picker for amount of times a day a user would like to use their medication. Once => q24 hours, twice => q12, etc. */}
          <Text>How frequently would you like reminders?: (Tap date to change)</Text>
          <View style={styles.pickerHours}>
            <Text 
              onPress={() => this.setState((prevState) => ({
                ...prevState,
                showFrequencyPicker: true
              }))}>Frequency: {this.state.repeatIntervalDays}</Text>
            {this.showFrequencyPicker()}
         </View>
  
            <Button title="Add to My Medications" onPress={this.screenMedicationsForDuplicates}/>  
      </Overlay>
    )
  }
}

const mapStateToProps = state => {
  console.log("state from medicationModal", state)
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

const styles = StyleSheet.create({
  pickerHours: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  input: { 
      backgroundColor:"whitesmoke", 
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1,
      margin: 5
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MedicationModal)