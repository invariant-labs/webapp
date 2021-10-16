import { call, put, select, takeEvery } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions } from '@reducers/swap'
import { swap } from '@selectors/swap'
import { accounts } from '@selectors/solanaWallet'
import { createAccount, getWallet } from './wallet'
import { getMarketProgram } from '@web3/programs/amm'
import { pools } from '@selectors/pools'
import { Pair } from '@invariant-labs/sdk'
import { MAX_U64 } from '@consts/static'
import BN from 'bn.js'
import { getConnection } from './connection'

export function* handleSwap(): Generator {
  try {
    const allPools = yield* select(pools)
    const swapData = yield* select(swap)

    const swapPool = allPools.find((pool) =>
      (swapData.fromToken.toString() === pool.tokenX.toString() && swapData.toToken.toString() === pool.tokenY.toString()) ||
      (swapData.fromToken.toString() === pool.tokenY.toString() && swapData.toToken.toString() === pool.tokenX.toString())
    )

    if (!swapPool) {
      return
    }

    const isXtoY = swapData.fromToken.toString() === swapPool.tokenX.toString() && swapData.toToken.toString() === swapPool.tokenY.toString()

    const wallet = yield* call(getWallet)

    const tokensAccounts = yield* select(accounts)
    const marketProgram = yield* call(getMarketProgram)

    let fromAddress = tokensAccounts[swapData.fromToken.toString()]
      ? tokensAccounts[swapData.fromToken.toString()].address
      : null
    if (fromAddress === null) {
      fromAddress = yield* call(createAccount, swapData.fromToken)
    }
    let toAddress = tokensAccounts[swapData.toToken.toString()]
      ? tokensAccounts[swapData.toToken.toString()].address
      : null
    if (toAddress === null) {
      toAddress = yield* call(createAccount, swapData.toToken)
    }
    const swapTx = yield* call([marketProgram, marketProgram.swapTransaction],
      new Pair(swapPool.tokenX, swapPool.tokenY),
      isXtoY,
      swapData.amount,
      isXtoY ? new BN(0) : MAX_U64,
      isXtoY ? fromAddress : toAddress,
      isXtoY ? toAddress : fromAddress,
      wallet.publicKey
    )
    const connection = yield* call(getConnection)
    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    swapTx.recentBlockhash = blockhash.blockhash
    swapTx.feePayer = wallet.publicKey

    const signedTx = yield* call([wallet, wallet.signTransaction], swapTx)
    yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
      skipPreflight: true
    })

    yield put(
      snackbarsActions.add({
        message: 'Tokens swapped successfully.',
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
export function* swapHandler(): Generator {
  yield* takeEvery(actions.swap, handleSwap)
}
