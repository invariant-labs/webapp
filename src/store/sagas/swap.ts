import { call, put, select, takeEvery } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions as swapActions } from '@reducers/swap'
import { swap } from '@selectors/swap'
import { pools, tokens } from '@selectors/pools'
import { accounts } from '@selectors/solanaWallet'
import { createAccount, getWallet } from './wallet'
import { getMarketProgram } from '@web3/programs/amm'
import { Pair } from '@invariant-labs/sdk'
import { getConnection } from './connection'
import { Keypair, sendAndConfirmRawTransaction, SystemProgram, Transaction } from '@solana/web3.js'
import { NATIVE_MINT, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { WRAPPED_SOL_ADDRESS, PAIRS } from '@consts/static'
import { network } from '@selectors/solanaConnection'

export function* handleSwapWithSOL(): Generator {
  try {
    const allTokens = yield* select(tokens)
    const allPools = yield* select(pools)
    const networkType = yield* select(network)
    const { slippage, tokenFrom, tokenTo, amountIn, knownPrice, poolIndex, byAmountIn, amountOut } =
      yield* select(swap)

    const wallet = yield* call(getWallet)
    const tokensAccounts = yield* select(accounts)
    const connection = yield* call(getConnection)
    const marketProgram = yield* call(getMarketProgram)
    const swapPool = allPools.find(
      pool =>
        (tokenFrom.equals(pool.tokenX) && tokenTo.equals(pool.tokenY)) ||
        (tokenFrom.equals(pool.tokenY) && tokenTo.equals(pool.tokenX))
    )

    if (!swapPool) {
      return
    }

    const isXtoY = tokenFrom.equals(swapPool.tokenX)

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
        allTokens[tokenFrom.toString()].address.toString() === WRAPPED_SOL_ADDRESS
          ? amountIn.toNumber()
          : 0
    })

    const initIx = Token.createInitAccountInstruction(
      TOKEN_PROGRAM_ID,
      NATIVE_MINT,
      wrappedSolAccount.publicKey,
      wallet.publicKey
    )

    const initialTx =
      allTokens[tokenFrom.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? new Transaction().add(createIx).add(transferIx).add(initIx)
        : new Transaction().add(createIx).add(initIx)
    const initialBlockhash = yield* call([connection, connection.getRecentBlockhash])
    initialTx.recentBlockhash = initialBlockhash.blockhash
    initialTx.feePayer = wallet.publicKey

    const initialSignedTx = yield* call([wallet, wallet.signTransaction], initialTx)
    initialSignedTx.partialSign(wrappedSolAccount)
    const initialTxid = yield* call(
      sendAndConfirmRawTransaction,
      connection,
      initialSignedTx.serialize(),
      {
        skipPreflight: false
      }
    )

    if (!initialTxid.length) {
      yield put(swapActions.setSwapSuccess(false))

      return yield put(
        snackbarsActions.add({
          message: 'SOL wrapping failed. Please try again.',
          variant: 'error',
          persist: false,
          txid: initialTxid
        })
      )
    }

    const unwrapIx = Token.createCloseAccountInstruction(
      TOKEN_PROGRAM_ID,
      wrappedSolAccount.publicKey,
      wallet.publicKey,
      wallet.publicKey,
      []
    )

    let fromAddress =
      allTokens[tokenFrom.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[tokenFrom.toString()]
        ? tokensAccounts[tokenFrom.toString()].address
        : null
    if (fromAddress === null) {
      fromAddress = yield* call(createAccount, tokenFrom)
    }
    let toAddress =
      allTokens[tokenTo.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[tokenTo.toString()]
        ? tokensAccounts[tokenTo.toString()].address
        : null
    if (toAddress === null) {
      toAddress = yield* call(createAccount, tokenTo)
    }
    const swapTx = yield* call([marketProgram, marketProgram.swapTransactionSplit], {
      pair: new Pair(tokenFrom, tokenTo, PAIRS[networkType][poolIndex].feeTier),
      xToY: isXtoY,
      amount: byAmountIn ? amountIn : amountOut,
      knownPrice: knownPrice,
      slippage: slippage,
      accountX: isXtoY ? fromAddress : toAddress,
      accountY: isXtoY ? toAddress : fromAddress,
      byAmountIn: byAmountIn,
      owner: wallet.publicKey
    })
    const swapBlockhash = yield* call([connection, connection.getRecentBlockhash])
    swapTx.recentBlockhash = swapBlockhash.blockhash
    swapTx.feePayer = wallet.publicKey

    const swapSignedTx = yield* call([wallet, wallet.signTransaction], swapTx)
    const swapTxid = yield* call(
      sendAndConfirmRawTransaction,
      connection,
      swapSignedTx.serialize(),
      {
        skipPreflight: false
      }
    )

    if (!swapTxid.length) {
      yield put(swapActions.setSwapSuccess(false))

      return yield put(
        snackbarsActions.add({
          message:
            'Tokens swapping failed. Please unwrap wrapped SOL in your wallet and try again.',
          variant: 'error',
          persist: false,
          txid: swapTxid
        })
      )
    }

    const unwrapTx = new Transaction().add(unwrapIx)
    const unwrapBlockhash = yield* call([connection, connection.getRecentBlockhash])
    unwrapTx.recentBlockhash = unwrapBlockhash.blockhash
    unwrapTx.feePayer = wallet.publicKey

    const unwrapSignedTx = yield* call([wallet, wallet.signTransaction], unwrapTx)
    const unwrapTxid = yield* call(
      sendAndConfirmRawTransaction,
      connection,
      unwrapSignedTx.serialize(),
      {
        skipPreflight: false
      }
    )

    yield put(swapActions.setSwapSuccess(true))

    if (!unwrapTxid.length) {
      yield put(
        snackbarsActions.add({
          message:
            'Tokens swapped successfully, but wrapped SOL unwrap failed. Try to unwrap it in your wallet.',
          variant: 'error',
          persist: false,
          txid: unwrapTxid
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Tokens swapped successfully.',
          variant: 'success',
          persist: false,
          txid: swapTxid
        })
      )
    }
  } catch (error) {
    console.log(error)

    yield put(swapActions.setSwapSuccess(false))

    yield put(
      snackbarsActions.add({
        message:
          'Failed to send. Please unwrap wrapped SOL in your wallet if you have any and try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleSwap(): Generator {
  try {
    const allTokens = yield* select(tokens)
    const allPools = yield* select(pools)
    const networkType = yield* select(network)
    const { slippage, tokenFrom, tokenTo, amountIn, knownPrice, poolIndex, byAmountIn, amountOut } =
      yield* select(swap)

    if (
      allTokens[tokenFrom.toString()].address.toString() === WRAPPED_SOL_ADDRESS ||
      allTokens[tokenTo.toString()].address.toString() === WRAPPED_SOL_ADDRESS
    ) {
      return yield* call(handleSwapWithSOL)
    }

    const wallet = yield* call(getWallet)
    const tokensAccounts = yield* select(accounts)
    const marketProgram = yield* call(getMarketProgram)
    const swapPool = allPools.find(
      pool =>
        (tokenFrom.equals(pool.tokenX) && tokenTo.equals(pool.tokenY)) ||
        (tokenFrom.equals(pool.tokenY) && tokenTo.equals(pool.tokenX))
    )

    if (!swapPool) {
      return
    }

    const isXtoY = tokenFrom.equals(swapPool.tokenX)

    let fromAddress = tokensAccounts[tokenFrom.toString()]
      ? tokensAccounts[tokenFrom.toString()].address
      : null
    if (fromAddress === null) {
      fromAddress = yield* call(createAccount, tokenFrom)
    }
    let toAddress = tokensAccounts[tokenTo.toString()]
      ? tokensAccounts[tokenTo.toString()].address
      : null
    if (toAddress === null) {
      toAddress = yield* call(createAccount, tokenTo)
    }
    const swapTx = yield* call([marketProgram, marketProgram.swapTransactionSplit], {
      pair: new Pair(tokenFrom, tokenTo, PAIRS[networkType][poolIndex].feeTier),
      xToY: isXtoY,
      amount: byAmountIn ? amountIn : amountOut,
      knownPrice: knownPrice,
      slippage: slippage,
      accountX: isXtoY ? fromAddress : toAddress,
      accountY: isXtoY ? toAddress : fromAddress,
      byAmountIn: byAmountIn,
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

    yield put(swapActions.setSwapSuccess(!!txid.length))

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

    yield put(swapActions.setSwapSuccess(false))

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
  yield* takeEvery(swapActions.swap, handleSwap)
}
