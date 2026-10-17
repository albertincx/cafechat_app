import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { configureStore } from '@reduxjs/toolkit'

export default function configure () {
  const reduxSagaMonitorOptions = {}

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)

  const middlewares = [sagaMiddleware]

  // @ts-ignore
  const store = configureStore({
    reducer: (state = {}) => state,
    // @ts-ignore
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat([applyMiddleware(...middlewares)]),
  })

  return store
}
