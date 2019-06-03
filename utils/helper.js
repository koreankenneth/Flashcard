import { Notifications, Permissions } from 'expo' 
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'Flashcard:notifications'

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(() => {
      console.log('removing noti...')
      Notifications.cancelAllScheduledNotificationsAsync()
        .then(console.log('noti cancelled successfully!'))
        .catch((error) => console.warn(error))
    })
}

function createNotification () {
  return {
    title: 'Study hard!',
    body: "Don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      vibrate: true,
      priority: 'high',
      sticky: false,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true) )
            }
          })
      }
    })
}

export function formatDeck(title) {
  return {
    [title]: {
      title: title,
      questions: []
    }
  }
}

export function formatCard(question, answer, correct) {
  return {
    question,
    answer,
    correct,
  }
}
