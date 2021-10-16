import { call, put, select, takeEvery } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { swap } from '@selectors/swap'
import { accounts } from '@selectors/solanaWallet'
import { createAccount, getWallet } from './wallet'
import { getMarketProgram } from '@web3/programs/amm'
import { pools } from '@selectors/pools'
import { Pair } from '@invariant-labs/sdk'
import { MAX_U64 } from '@consts/static'
import BN from 'bn.js'
import { getConnection } from './connection'
import { actions } from '@reducers/position'
import { Transaction } from '@solana/web3.js'

export function* handleInitPosition(): Generator {
  try {
    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const tx = new Transaction()
    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey
    const signedTx = yield* call([wallet, wallet.signTransaction], tx)

    yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
      skipPreflight: true
    })

    yield put(
      snackbarsActions.add({
        message: 'Position added successfully.',
        variant: 'success',
        persist: false
      })
    )
  } catch (error) {
    console.log(error)
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}
export function* initPositionHandler(): Generator {
  yield* takeEvery(actions.position, handleInitPosition)
}
