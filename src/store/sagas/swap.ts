import { call, put, select, takeEvery } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions } from '@reducers/swap'
import { swap } from '@selectors/swap'
import { accounts } from '@selectors/solanaWallet'
import { createAccount, getWallet } from './wallet'
import { getMarketProgram } from '@web3/programs/amm'
import { pools, tokens } from '@selectors/pools'
import { Pair } from '@invariant-labs/sdk'
import { getConnection } from './connection'
import { FEE_TIERS } from '@invariant-labs/sdk/src/utils'
import { Keypair, sendAndConfirmRawTransaction, SystemProgram, Transaction } from '@solana/web3.js'
import { NATIVE_MINT, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { MAINNET_SOL_ADDRESS } from '@consts/static'

export function* handleSwapWithSOL(): Generator {
  try {
    const allTokens = yield* select(tokens)
    const allPools = yield* select(pools)
    const swapData = yield* select(swap)
    const swapPool = allPools.find(
      pool =>
        (swapData.fromToken.toString() === pool.tokenX.toString() &&
          swapData.toToken.toString() === pool.tokenY.toString()) ||
        (swapData.fromToken.toString() === pool.tokenY.toString() &&
          swapData.toToken.toString() === pool.tokenX.toString())
    )

    if (!swapPool) {
      return
    }

    const isXtoY =
      swapData.fromToken.toString() === swapPool.tokenX.toString() &&
      swapData.toToken.toString() === swapPool.tokenY.toString()

    const wallet = yield* call(getWallet)

    const tokensAccounts = yield* select(accounts)
    const marketProgram = yield* call(getMarketProgram)
    const connection = yield* call(getConnection)

    const wrappedSolAccount = Keypair.generate()

    const createIx = SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: wrappedSolAccount.publicKey,
      lamports: yield* call(Token.getMinBalanceRentForExemptAccount, connection),
      space: 165,
      programId: TOKEN_PROGRAM_ID
    })

    const transferIx = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: wrappedSolAccount.publicKey,
      lamports:
        allTokens[swapData.fromToken.toString()].address.toString() === MAINNET_SOL_ADDRESS ? swapData.amount.toNumber() : 0
    })

    const initIx = Token.createInitAccountInstruction(
      TOKEN_PROGRAM_ID,
      NATIVE_MINT,
      wrappedSolAccount.publicKey,
      wallet.publicKey
    )

    const unwrapIx = Token.createCloseAccountInstruction(
      TOKEN_PROGRAM_ID,
      wrappedSolAccount.publicKey,
      wallet.publicKey,
      wallet.publicKey,
      []
    )

    let fromAddress =
      allTokens[swapData.fromToken.toString()].address.toString() === MAINNET_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[swapData.fromToken.toString()]
        ? tokensAccounts[swapData.fromToken.toString()].address
        : null
    if (fromAddress === null) {
      fromAddress = yield* call(createAccount, swapData.fromToken)
    }
    let toAddress =
      allTokens[swapData.toToken.toString()].address.toString() === MAINNET_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[swapData.toToken.toString()]
        ? tokensAccounts[swapData.toToken.toString()].address
        : null
    if (toAddress === null) {
      toAddress = yield* call(createAccount, swapData.toToken)
    }
    const swapTx = yield* call([marketProgram, marketProgram.swapTransaction], {
      pair: new Pair(swapData.fromToken, swapData.toToken, FEE_TIERS[0]),
      xToY: isXtoY,
      amount: swapData.amount,
      knownPrice: swapData.price,
      slippage: swapData.slippage,
      accountX: isXtoY ? fromAddress : toAddress,
      accountY: isXtoY ? toAddress : fromAddress,
      byAmountIn: true,
      owner: wallet.publicKey
    })
    const tx =
      allTokens[swapData.fromToken.toString()].address.toString() === MAINNET_SOL_ADDRESS
        ? new Transaction().add(createIx).add(transferIx).add(initIx).add(swapTx).add(unwrapIx)
        : new Transaction().add(createIx).add(initIx).add(swapTx).add(unwrapIx)
    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey

    const signedTx = yield* call([wallet, wallet.signTransaction], tx)
    const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
      skipPreflight: false
    })

    yield put(actions.setSwapSuccess(!!txid.length))

    if (!txid.length) {
      yield put(
        snackbarsActions.add({
          message: 'Tokens swapping failed. Please try again.',
          variant: 'error',
          persist: false,
          txid
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Tokens swapped successfully.',
          variant: 'success',
          persist: false,
          txid
        })
      )
    }
  } catch (error) {
    console.log(error)

    yield put(actions.setSwapSuccess(false))

    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleSwap(): Generator {
  try {
    const allTokens = yield* select(tokens)
    const swapData = yield* select(swap)

    if (
      allTokens[swapData.fromToken.toString()].address.toString() === MAINNET_SOL_ADDRESS ||
      allTokens[swapData.toToken.toString()].address.toString() === MAINNET_SOL_ADDRESS
    ) {
      return yield* call(handleSwapWithSOL)
    }

    const allPools = yield* select(pools)
    const swapPool = allPools.find(
      pool =>
        (swapData.fromToken.toString() === pool.tokenX.toString() &&
          swapData.toToken.toString() === pool.tokenY.toString()) ||
        (swapData.fromToken.toString() === pool.tokenY.toString() &&
          swapData.toToken.toString() === pool.tokenX.toString())
    )

    if (!swapPool) {
      return
    }

    const isXtoY =
      swapData.fromToken.toString() === swapPool.tokenX.toString() &&
      swapData.toToken.toString() === swapPool.tokenY.toString()

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
    const swapTx = yield* call([marketProgram, marketProgram.swapTransaction], {
      pair: new Pair(swapData.fromToken, swapData.toToken, FEE_TIERS[0]),
      xToY: isXtoY,
      amount: swapData.amount,
      knownPrice: swapData.price,
      slippage: swapData.slippage,
      accountX: isXtoY ? fromAddress : toAddress,
      accountY: isXtoY ? toAddress : fromAddress,
      byAmountIn: true,
      owner: wallet.publicKey
    })
    const connection = yield* call(getConnection)
    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    swapTx.recentBlockhash = blockhash.blockhash
    swapTx.feePayer = wallet.publicKey

    const signedTx = yield* call([wallet, wallet.signTransaction], swapTx)
    const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
      skipPreflight: false
    })

    yield put(actions.setSwapSuccess(!!txid.length))

    if (!txid.length) {
      yield put(
        snackbarsActions.add({
          message: 'Tokens swapping failed. Please try again.',
          variant: 'error',
          persist: false,
          txid
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Tokens swapped successfully.',
          variant: 'success',
          persist: false,
          txid
        })
      )
    }
  } catch (error) {
    console.log(error)

    yield put(actions.setSwapSuccess(false))

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
