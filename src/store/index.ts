import createSagaMiddleware from 'redux-saga'
import { configureStore, isPlain } from '@reduxjs/toolkit'
import combinedReducers from './reducers'
import rootSaga from './sagas'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'

const isLocalhost = window.location.hostname === 'localhost'

const isSerializable = (value: unknown) => {
  return (
    typeof value === 'bigint' || isPlain(value) || value instanceof PublicKey || value instanceof BN
  )
}

const getEntries = (value: unknown) => {
  if (typeof value === 'bigint') {
    return [['bigint', value.toString()]] as [string, unknown][]
  }

  if (value instanceof PublicKey) {
    return [['PublicKey', (value as PublicKey).toBase58()]] as [string, unknown][]
  }

  if (value instanceof BN) {
    return [['BN', (value as BN).toString()]] as [string, unknown][]
  }

  return Object.entries(value as Record<string, unknown>)
}

const configureAppStore = (initialState = {}) => {
  const reduxSagaMonitorOptions = {}
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)

  const middleware = [sagaMiddleware]

  const store = configureStore({
    reducer: combinedReducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          isSerializable,
          getEntries,
          ignoredActions: ['positions/closePosition', 'pools/setTickMaps', 'pools/getPoolData']
        }
      }).concat(middleware),
    preloadedState: initialState,
    devTools: isLocalhost
      ? {
          serialize: {
            replacer: (_key, value) =>
              typeof value === 'bigint'
                ? value.toString()
                : value instanceof PublicKey
                  ? (value as PublicKey).toBase58()
                  : value instanceof BN
                    ? (value as BN).toString()
                    : value,
            options: true
          }
        }
      : false
  })

  sagaMiddleware.run(rootSaga)
  return store
}

export const store = configureAppStore()

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
