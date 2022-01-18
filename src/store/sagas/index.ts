import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { getPoolsDataHandler } from './pool'
import { swapSaga } from './swap'
import { walletSaga } from './wallet'
import { positionsSaga } from '@sagas/positions'
import { poolSaga } from '@sagas/pool'
export function* rootSaga(): Generator {
  yield all([connectionSaga, walletSaga, getPoolsDataHandler, swapSaga, positionsSaga].map(spawn))
}
export default rootSaga
