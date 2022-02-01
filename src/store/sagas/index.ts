import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { poolsSaga } from './pool'
import { swapHandler } from './swap'
import { walletSaga } from './wallet'
import { positionsSaga } from '@sagas/positions'

export function* rootSaga(): Generator {
  yield all(
    [connectionSaga, walletSaga, swapHandler, positionsSaga, poolsSaga].map(spawn)
  )
}
export default rootSaga
