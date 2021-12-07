import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { getPoolsDataHandler } from './pool'
import { swapSaga } from './swap'
import { walletSaga } from './wallet'
import { positionsSaga } from '@sagas/positions'
export function* rootSaga(): Generator {
  yield all(
    [connectionSaga, walletSaga, getPoolsDataHandler, swapSaga, positionsSaga].map(spawn)
  )
}
export default rootSaga
