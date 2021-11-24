import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { getPoolsDataHandler } from './pool'
import { swapHandler } from './swap'
import { walletSaga } from './wallet'
import { positionsSaga } from '@sagas/positions'
export function* rootSaga(): Generator {
  yield all(
    [connectionSaga, walletSaga, getPoolsDataHandler, swapHandler, positionsSaga].map(spawn)
  )
}
export default rootSaga
