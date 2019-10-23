import { Notifications } from 'expo'

export function configPushNotification(medicationObject, USER_TOKEN, offsetTime,startDate, repeatFrequency) {
    console.log("In the config")
    console.log(medicationObject, USER_TOKEN, offsetTime,startDate, repeatFrequency)
    const message = {
    to: USER_TOKEN,
    ios: {
        _displayInForeground: "true",
        sound: "true"
    },
    title: `Reminder to take: ${medicationObject.name}`,
    body: 'It is time to take your medication. Return to the application to take now!'
    //   data: { data: 'No Data Involved'},
    };

    const scheduling = {
        time: (startDate).getTime() + offsetTime,
        repeat: repeatFrequency
    }

    Notifications.scheduleLocalNotificationAsync(message, scheduling) 
};

export function calculateAmountOfNotifications(medicationObject, USER_TOKEN, startDate, repeatTime, repeatDays) {

    console.log(medicationObject, USER_TOKEN, startDate, repeatTime, repeatDays)

    let notificationsToBeScheduled
    let timeOffset
    let repeatInterval 

    switch(repeatTime) {
        //Determine the amount of notifications to be scheduled and the offset of time between each notification
        case "One":
            notificationsToBeScheduled = 1
            timeOffset = 'none'//24 hours => one day, no repeat
            break;
        case "Two":
            notificationsToBeScheduled = 2
            timeOffset = 43200000 //12 hours in miliseconds
            break;
        case "Three":
            notificationsToBeScheduled = 3
            timeOffset = 28800000 //8 hours in miliseconds
            break;
        case "Four":
            notificationsToBeScheduled = 4
            timeOffset = 21600000 //6 hours in miliseconds
            break;
        default:
          alert("Invalid for time set for reminders.")
    }

    switch(repeatDays) {
        case "Weekly":
            repeatInterval = 'week'
          break;
        case "Daily":
            repeatInterval = 'day'
          break;
        case "Monthly":
            repeatInterval = 'month'
          break;
        default:
            alert("Invalid input for frequency of reminders.")
    }

    // Format of notification:
    // configPushNotification(medicationObject, USER_TOKEN, offsetTime,startDate, repeatFrequency)

    let createdNotificationsCounter = 0
    while(createdNotificationsCounter < notificationsToBeScheduled){
        console.log("created notification", createdNotificationsCounter)
        if (timeOffset !== "none") {
            let offsetTimeCalculated =  timeOffset*createdNotificationsCounter
            configPushNotification(medicationObject, USER_TOKEN, offsetTimeCalculated, startDate, repeatInterval)
        } else {
            configPushNotification(medicationObject, USER_TOKEN, 0,startDate, repeatInterval)
        }
        createdNotificationsCounter++
    }
    
    // Sending an initial message to let the user know they now have notifications for this medication!
    confirmationNotification(medicationObject, USER_TOKEN, repeatTime, repeatInterval)

}

export function confirmationNotification(medicationObject, USER_TOKEN, repeatTime, repeatInterval) {
    console.log("Initial confirmation", medicationObject, USER_TOKEN, repeatTime, repeatInterval)
        const message = {
        to: USER_TOKEN,
        ios: {
            _displayInForeground: "true",
            sound: "true"
        },
        title: `Notifications Started for ${medicationObject.name}`,
        body: `You've signed up to receive ${repeatTime.toLowerCase()} notification(s) per ${repeatInterval} for this medication.`
        }

        const scheduling = {
            time: (new Date()).getTime() + 3000
        }

    Notifications.scheduleLocalNotificationAsync(message, scheduling) 
}

export function cancelNotifications() {
    Notifications.cancelAllScheduledNotificationsAsync()
}