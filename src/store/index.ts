/* eslint-disable @typescript-eslint/no-var-requires */
import { applyMiddleware, compose, createStore, Store } from 'redux'
import { middleware, sagaMiddleware } from './middleware'
import combinedReducers from './reducers'
import rootSaga from './sagas'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: <R>(a: R) => R
  }
}
type AppStore = Store<unknown, any>

const configureStore = (initialState = {}): AppStore => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose
  const store = createStore(
    combinedReducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  )
  // if (process.env.NODE_ENV === 'development' && module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     const newRootReducer = require('./reducers').default
  //     store.replaceReducer(newRootReducer)
  //   })
  // }
  return store
}
export const store = configureStore()

export const runSagas = (): unknown => sagaMiddleware.run(rootSaga)
