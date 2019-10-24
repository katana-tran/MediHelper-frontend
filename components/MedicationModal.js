import React, { Component } from 'react'
import { Overlay, Button, Card } from 'react-native-elements'
import { Text, Picker, TextInput, DatePickerIOS, View, StyleSheet, Keyboard, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { BASE_URL } from '../redux/actions/WorkingURL'
import { setUserMedication } from '../redux/actions/user.actions'
import * as userNotifications from '../utility/NotifyUserUtility'

class MedicationModal extends Component{

  constructor(){
    super()
    this.state = {
      amountRemaining: "",
      amountUsedPerDose: "",
      notificationStartDate: new Date(new Date().getTime() + 3600000),
      repeatIntervalTime: "One",
      repeatIntervalDays: "Daily",
      showDateTimePicker: false,
      showFrequencyPicker: false
    }
  }

  screenMedicationsForInput = () => {
    this.state.amountRemaining !== "" && this.state.amountUsedPerDose !== ""? this.screenMedicationsForDuplicates() : alert("You have not completely filled above form!")
  }

  screenMedicationsForDuplicates = () => {
    let duplicationArray = this.props.usersMedications.map((medication) => {
      return medication.name === this.props.medication.name? true : false
    })
    duplicationArray.includes(true)? alert("You've already added this medication.") : this.handleMedicationInfo()
  }

  handleMedicationInfo = () => {
    this.props.onToggle()
    userNotifications.calculateAmountOfNotifications(this.props.medication, this.props.user.token, this.state.notificationStartDate, this.state.repeatIntervalTime, this.state.repeatIntervalDays)

    // console.log(notificationId)
    fetch(BASE_URL+"/medications", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userID: this.props.user.id,
            medication: this.props.medication,
            amountRemaining: this.state.amountRemaining,
            amountUsedPerDose: this.state.amountUsedPerDose,
            notificationStartDate: this.state.notificationStartDate,
            repeatIntervalTime: this.state.repeatIntervalTime,
            repeatIntervalDays: this.state.repeatIntervalDays
        })
    })
    .then(response => response.json())
    .then(user_medications => {
      this.props.setUserMedication(user_medications) 
    })    
  }

  handleAmountRemainingText = text => {
    this.setState((prevState) => ({
      ...prevState,
      amountRemaining: text
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
      height="38%"
      width="90%"
      onBackdropPress={() => this.setStateStartTimePicker()}
      isVisible={true}>
        <Text style={styles.textPicker}>When would you like to start receiving notifications?</Text>
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
      height="38%"
      width="90%"
      onBackdropPress={() => this.setStateTimesADayPicker()}
      isVisible={true}>
        <Text style={styles.textPicker}>How many times per day will you take this medication?</Text>
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
      height="38%"
      width="90%"
      onBackdropPress={() => this.setStateFrequencyPicker()}
      isVisible={true}>
        <Text style={styles.textPicker}>How often will you take this medication?</Text>
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
      overlayStyle={{borderRadius:5}}
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

        <View style={styles.twoInputField}>
          {/* Calculating the amount of dosages remaining before the next needed refill by amt pills/etc remaining/dose */}
          <Text>Amount of capsules/applications/syringes remaining:</Text>
          <TextInput
              autoCapitalize="none" 
              keyboardType='numeric'
              onBlur={Keyboard.dismiss}
              onChangeText={text => this.handleAmountRemainingText(text)}
              value={this.state.amountRemaining} 
              placeholder="amount remaining" 
              style={styles.input}/>   
            
          <Text>Amount of capsules/applications/syringes per dose: </Text>
          <TextInput
              keyboardType='numeric'
              autoCapitalize="none" 
              onBlur={Keyboard.dismiss}
              onChangeText={text => this.handleAmountPerDoseText(text)}
              value={this.state.amountUsedPerDose} 
              placeholder="usage/dose" 
              style={styles.input}/>  
          </View>

          {/* Date Picker for when the user wants the first notification to pop up and the subsequent time they will pop up each day. */}
          <TouchableOpacity onPress={() => this.setState((prevState) => ({
            ...prevState,
            showDateTimePicker: true
          }))} style={styles.selectorWithPicker}>
            <Text style={styles.textPicker}>Start Notifications At: (Tap to change)</Text>
            <Text style={{textAlign: 'center', fontSize:15, marginTop:2}}>{this.state.notificationStartDate.toString()}</Text>
            {this.showDateTimePicker()}
          </TouchableOpacity>

          {/* Picker for amount of times a day a user would like to use their medication. Once => q24 hours, twice => q12, etc. */}
          <TouchableOpacity onPress={() => this.setState((prevState) => ({
            ...prevState,
            showFrequencyPicker: true
          }))}
            style={styles.selectorWithPicker}>
            <Text style={styles.textPicker}>How frequently would you like reminders?: (Tap to change)</Text>
              <Text style={{textAlign: 'center', fontSize:15}}>Frequency: {this.state.repeatIntervalDays}</Text>
              {this.showFrequencyPicker()}
         </TouchableOpacity>

          <TouchableOpacity onPress={() => this.setState((prevState) => ({
            ...prevState,
            showTimesADayPicker: true
          }))}
          style={styles.selectorWithPicker}>
            <Text style={styles.textPicker}>How many times would you like reminders on those days?: (Tap to change)</Text>
            <Text style={{textAlign: 'center', fontSize:15}}>{this.state.repeatIntervalTime} time(s) a day.</Text>
              {this.showTimesADayPicker()}
          </TouchableOpacity>

            <Button containerStyle={{position: 'absolute',
      bottom: 5, left: 5, right: 5,}} title="Add to My Medications" onPress={this.screenMedicationsForInput}/>  
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
    flex: 1
  },
  input: { 
      backgroundColor:"whitesmoke", 
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1,
      margin: 5
  },
  twoInputField: {
    marginTop: 30,
    marginBottom: 50
  },
  selectorWithPicker: {
    marginBottom: 30
  },
  textPicker: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MedicationModal)