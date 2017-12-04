import * as types from '../actions/types'
import { getDecks, getDeck, saveDeck, removeDeck } from '../utils/api'

const dataService = store => next => action => {
  // Pass all actions through by default
  next(action)
  switch (action.type) {
    case types.GET_DECKS:
      return getDecks()
        .then(({decks}) => {
          next({
            type: types.RECEIVE_DECKS,
            decks
          })
        })
        .catch((err) => {
          return next({
            type: types.GET_DECKS_ERROR,
            err
          })
        })
      break
    case types.GET_DECK:
      return getDeck(action.key)
        .then(({deck}) => {
          next({
            type: types.RECEIVE_DECK,
            deck
          })
        })
        .catch((err) => {
          return next({
            type: types.GET_DECK_ERROR,
            err
          })
        })
      break
    case types.SAVE_DECK:
      return saveDeck(action)
        .then(() => {
          next({
            type: types.SUBMITTED_DECK,
            deck: {
              [action.key]: action.deck
            }
          })
        })
        .catch((err) => {
          return next({
            type: types.SAVE_DECK_ERROR,
            err
          })
        })
      break
    case types.REMOVE_DECK:
      return removeDeck(action.key)
        .then(() => {
          next({
            type: types.DELETED_DECK,
            key: action.key
          })
        })
        .catch((err) => {
          return next({
            type: types.REMOVE_DECK_ERROR,
            err
          })
        })
      break
    default:
      break
  }

}

export default dataService