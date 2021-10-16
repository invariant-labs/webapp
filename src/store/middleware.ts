import createSagaMiddleware from 'redux-saga'

// It will start spinning sagas passed to it as an args
export const sagaMiddleware = createSagaMiddleware()

// Push custom middleware here
export const middleware = [sagaMiddleware]
