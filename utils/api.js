import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'Flashcard:deck'
const dummyData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
        correct: true,
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
        correct: true,
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
        correct: true,
      }
    ]
  }
}

export function fetchFlashcardResults () {


  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => {
      if (results === null) {
        AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(dummyData))
        return dummyData
      }
      return JSON.parse(results)
    })
}

export function submitDeck (deck) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(
    deck
  ))
}

export function submitCard (title, card) {
  let deck  = {}
  AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((result) => {
      const decks = JSON.parse(result)
      deck = {
        [title]: {
          ...decks[title],
          questions: [...decks[title].questions, card]

        }
      }
      return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(deck))
    })
}

export function removeDeck (title) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title] = undefined
      delete data[title]
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
    })
}