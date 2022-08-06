import { all, call, put, SagaGenerator, select, takeLeading, spawn, delay } from 'typed-redux-saga'

import { actions, Status, PayloadTypes } from '@reducers/solanaConnection'
import { getSolanaConnection } from '@web3/connection'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { rpcAddress } from '@selectors/solanaConnection'
import { Connection } from '@solana/web3.js'
import { PayloadAction } from '@reduxjs/toolkit'

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
export function* connectionSaga(): Generator {
  yield* all([networkChangeSaga, initConnectionSaga, updateSlotSaga].map(spawn))
}
