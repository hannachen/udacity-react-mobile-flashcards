import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers'
import dataService from '../services/data-service'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(dataService, logger)
  )
)

export default store