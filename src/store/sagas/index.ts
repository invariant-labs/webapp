import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { poolsSaga } from './pool'
import { swapHandler } from './swap'
import { walletSaga } from './wallet'
import { positionsSaga } from '@sagas/positions'
import { statsHandler } from './stats'
import { farmsSaga } from './farms'

export function* rootSaga(): Generator {
  yield all(
    [connectionSaga, walletSaga, swapHandler, positionsSaga, poolsSaga, statsHandler, farmsSaga].map(spawn)
  )
}
export default rootSaga
