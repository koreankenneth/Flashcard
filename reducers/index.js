import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return Object.assign({}, state, action.decks)
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    case DELETE_DECK :
      let stateBuffer = {...state}
      delete stateBuffer[action.title]
      return {
        ...stateBuffer,
      }
    case ADD_CARD : 
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, action.card]
        }
      }
    default :
      return state
  }
}

export default decks