import * as types from '../actions/types'

export const decks = (state = {}, action) => {
  switch(action.type) {
    case types.RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case types.RECEIVE_DECK:
      return {
        ...state,
        ...action.deck,
      }
    case types.SUBMITTED_DECK:
      return {
        ...state,
        ...action.deck
      }
    case types.DELETED_DECK:
      const newState = {
        ...state
      }
      newState[action.key] = undefined
      delete newState[action.key]
      return newState
    default:
      return state
  }
}
