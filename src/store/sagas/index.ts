import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { poolsSaga } from './pool'
import { swapHandler } from './swap'
import { walletSaga } from './wallet'
import { positionsSaga } from './positions'
import { statsSaga } from './stats'

export function* rootSaga(): Generator {
  yield all(
    [connectionSaga, walletSaga, swapHandler, positionsSaga, poolsSaga, statsSaga].map(spawn)
  )
}
export default rootSaga
