import { all, call, put, SagaGenerator, select, takeLeading, spawn, delay } from 'typed-redux-saga'

import { actions, Status, PayloadTypes, RpcStatus } from '@reducers/solanaConnection'
import { getSolanaConnection } from '@web3/connection'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { rpcAddress, rpcStatus } from '@selectors/solanaConnection'
import { Connection } from '@solana/web3.js'
import { PayloadAction } from '@reduxjs/toolkit'
import { RECOMMENDED_RPC_ADDRESS } from '@consts/static'

export function* handleRpcError(error: string): Generator {
  const currentRpc = yield* select(rpcAddress)
  const currentRpcStatus = yield* select(rpcStatus)

  console.log(error)

  if (
    currentRpc !== RECOMMENDED_RPC_ADDRESS &&
    (error.includes('Failed to fetch') || error.includes('400') || error.includes('403'))
  ) {
    if (currentRpcStatus === RpcStatus.Uninitialized) {
      yield* put(actions.setRpcStatus(RpcStatus.Error))
    } else if (currentRpcStatus === RpcStatus.Ignored) {
      yield* put(actions.setRpcStatus(RpcStatus.IgnoredWithError))
    }
  }
}

export function* handleRpcErrorHandler(action: PayloadAction<PromiseRejectionEvent>): Generator {
  yield* call(handleRpcError, action.payload.reason.message)
}

export function* getConnection(): SagaGenerator<Connection> {
  const rpc = yield* select(rpcAddress)
  const connection = yield* call(getSolanaConnection, rpc)
  return connection
}

export function* initConnection(): Generator {
  try {
    yield* call(getConnection)
    // TODO: pull state here

    // yield* call(pullUserAccountData)
    // yield* call(init)
    yield* put(
      snackbarsActions.add({
        message: 'Solana network connected.',
        variant: 'success',
        persist: false
      })
    )
    yield* put(actions.setStatus(Status.Initialized))
    // yield* call(depositCollateral, new BN(4 * 1e8))
    // yield* call(mintUsd, new BN(8 * 1e7))
    // yield* call(handleAirdrop)
  } catch (error) {
    console.log(error)
    yield* put(actions.setStatus(Status.Error))
    yield put(
      snackbarsActions.add({
        message: 'Failed to connect to Solana network',
        variant: 'error',
        persist: false
      })
    )

    yield* call(handleRpcError, (error as Error).message)
  }
}

export function* handleNetworkChange(action: PayloadAction<PayloadTypes['setNetwork']>): Generator {
  yield* delay(1000)
  window.location.reload()
  yield* put(
    snackbarsActions.add({
      message: `You are on network ${action.payload.network}${
        action.payload?.rpcName ? ' (' + action.payload.rpcName + ')' : ''
      }.`,
      variant: 'info',
      persist: false
    })
  )
}

export function* updateSlot(): Generator {
  const connection = yield* call(getConnection)
  const slot = yield* call([connection, connection.getSlot])
  yield* put(actions.setSlot(slot))
}

export function* updateSlotSaga(): Generator {
  yield takeLeading(actions.updateSlot, updateSlot)
}

export function* networkChangeSaga(): Generator {
  yield takeLeading(actions.setNetwork, handleNetworkChange)
}
export function* initConnectionSaga(): Generator {
  yield takeLeading(actions.initSolanaConnection, initConnection)
}
export function* handleRpcErrorSaga(): Generator {
  yield takeLeading(actions.handleRpcError, handleRpcErrorHandler)
}
export function* connectionSaga(): Generator {
  yield* all([networkChangeSaga, initConnectionSaga, updateSlotSaga, handleRpcErrorSaga].map(spawn))
}
