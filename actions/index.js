import * as types from './types'

// Decks
export function getDecks() {
  return {
    type: types.GET_DECKS
  }
}
export function getDeck(key) {
  return {
    type: types.GET_DECKS,
    key
  }
}

export function saveDeck({ key, deck }) {
  return {
    type: types.SAVE_DECK,
    key,
    deck
  }
}

export function removeDeck(key) {
  return {
    type: types.REMOVE_DECK,
    key
  }
}