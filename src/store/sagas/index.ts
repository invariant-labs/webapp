import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { poolsSaga } from './pool'
import { swapHandler } from './swap'
import { walletSaga } from './wallet'
import { positionsSaga } from '@sagas/positions'
import { statsHandler } from './stats'

export function* rootSaga(): Generator {
  yield all(
    [connectionSaga, walletSaga, swapHandler, positionsSaga, poolsSaga, statsHandler].map(spawn)
  )
}
export default rootSaga
