import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { poolsSaga } from './pool'
import { swapHandler } from './swap'
import { walletSaga } from './wallet'
import { positionsSaga } from '@sagas/positions'
import { statsHandler } from './stats'
import { farmsSaga } from './farms'
import { bondsSaga } from './bonds'
import { RpcStatus, actions as solanaConnectionActions } from '@reducers/solanaConnection'
import { put, select } from 'typed-redux-saga'
import { rpcStatus } from '@selectors/solanaConnection'

export function* handleError(error: Error): Generator {
  const currentRpcStatus = yield* select(rpcStatus)

  if (error.message.includes('Failed to fetch') || error.message.includes('403')) {
    if (currentRpcStatus === RpcStatus.Uninitialized) {
      yield* put(solanaConnectionActions.setRpcStatus(RpcStatus.Error))
    } else if (currentRpcStatus === RpcStatus.Ignored) {
      yield* put(solanaConnectionActions.setRpcStatus(RpcStatus.IgnoredWithError))
    }
  }
}

export function* rootSaga(): Generator {
  yield all(
    [
      connectionSaga,
      walletSaga,
      swapHandler,
      positionsSaga,
      poolsSaga,
      statsHandler,
      bondsSaga,
      farmsSaga
    ].map(spawn)
  )
}
export default rootSaga
