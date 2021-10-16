import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { getPoolsDataHandler } from './pool'
import { swapHandler } from './swap'
import { walletSaga } from './wallet'
import { initPositionHandler } from '@sagas/position'
export function* rootSaga(): Generator {
  yield all(
    [connectionSaga, walletSaga, getPoolsDataHandler, swapHandler, initPositionHandler].map(spawn)
  )
}
export default rootSaga
