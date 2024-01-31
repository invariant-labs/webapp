import { WRAPPED_SOL_ADDRESS } from '@consts/static'
import { solToMicroLamports } from '@consts/utils'
import { Pair } from '@invariant-labs/sdk'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions as swapActions } from '@reducers/swap'
import { poolsArraySortedByFees, tokens } from '@selectors/pools'
import { network, rpcAddress } from '@selectors/solanaConnection'
import { accounts } from '@selectors/solanaWallet'
import { swap } from '@selectors/swap'
import { NATIVE_MINT, TOKEN_PROGRAM_ID, Token } from '@solana/spl-token'
import { Keypair, SystemProgram, Transaction, sendAndConfirmRawTransaction } from '@solana/web3.js'
import { getMarketProgram } from '@web3/programs/amm'
import { call, put, select, takeEvery } from 'typed-redux-saga'
import { getConnection } from './connection'
import { createAccount, getWallet } from './wallet'

export function* handleSwapWithSOL(): Generator {
  try {
    const allTokens = yield* select(tokens)
    const allPools = yield* select(poolsArraySortedByFees)
    const {
      slippage,
      tokenFrom,
      tokenTo,
      amountIn,
      estimatedPriceAfterSwap,
      poolIndex,
      byAmountIn,
      amountOut
    } = yield* select(swap)

    const wallet = yield* call(getWallet)
    const tokensAccounts = yield* select(accounts)
    const connection = yield* call(getConnection)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc)
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

    let initialTx =
      allTokens[tokenFrom.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? new Transaction().add(createIx).add(transferIx).add(initIx)
        : new Transaction().add(createIx).add(initIx)
    const initialBlockhash = yield* call([connection, connection.getRecentBlockhash])
    initialTx.recentBlockhash = initialBlockhash.blockhash
    initialTx.feePayer = wallet.publicKey

    const fee = localStorage.getItem('INVARIANT_MAINNET_PRIORITY_FEE')

    if (fee) {
      initialTx = yield* call(
        [marketProgram, marketProgram.addPriorityFee],
        solToMicroLamports(+fee),
        initialTx
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
    let swapTx = yield* call([marketProgram, marketProgram.swapTransaction], {
      pair: new Pair(tokenFrom, tokenTo, {
        fee: allPools[poolIndex].fee.v,
        tickSpacing: allPools[poolIndex].tickSpacing
      }),
      xToY: isXtoY,
      amount: byAmountIn ? amountIn : amountOut,
      estimatedPriceAfterSwap,
      slippage: slippage,
      accountX: isXtoY ? fromAddress : toAddress,
      accountY: isXtoY ? toAddress : fromAddress,
      byAmountIn: byAmountIn,
      owner: wallet.publicKey
    })
    const swapBlockhash = yield* call([connection, connection.getRecentBlockhash])
    swapTx.recentBlockhash = swapBlockhash.blockhash
    swapTx.feePayer = wallet.publicKey

    if (fee) {
      swapTx = yield* call(
        [marketProgram, marketProgram.addPriorityFee],
        solToMicroLamports(+fee),
        swapTx
      )
    }

    let unwrapTx = new Transaction().add(unwrapIx)
    const unwrapBlockhash = yield* call([connection, connection.getRecentBlockhash])
    unwrapTx.recentBlockhash = unwrapBlockhash.blockhash
    unwrapTx.feePayer = wallet.publicKey

    if (fee) {
      unwrapTx = yield* call(
        [marketProgram, marketProgram.addPriorityFee],
        solToMicroLamports(+fee),
        unwrapTx
      )
    }

    const [initialSignedTx, swapSignedTx, unwrapSignedTx] = yield* call(
      [wallet, wallet.signAllTransactions],
      [initialTx, swapTx, unwrapTx]
    )

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
          message: 'Wrapped SOL unwrap failed. Try to unwrap it in your wallet.',
          variant: 'warning',
          persist: false,
          txid: unwrapTxid
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'SOL unwrapped successfully.',
          variant: 'success',
          persist: false,
          txid: unwrapTxid
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
    const allPools = yield* select(poolsArraySortedByFees)
    const {
      slippage,
      tokenFrom,
      tokenTo,
      amountIn,
      estimatedPriceAfterSwap,
      poolIndex,
      byAmountIn,
      amountOut
    } = yield* select(swap)

    if (
      allTokens[tokenFrom.toString()].address.toString() === WRAPPED_SOL_ADDRESS ||
      allTokens[tokenTo.toString()].address.toString() === WRAPPED_SOL_ADDRESS
    ) {
      return yield* call(handleSwapWithSOL)
    }

    const wallet = yield* call(getWallet)
    const tokensAccounts = yield* select(accounts)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc)
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
    let swapTx = yield* call([marketProgram, marketProgram.swapTransaction], {
      pair: new Pair(tokenFrom, tokenTo, {
        fee: allPools[poolIndex].fee.v,
        tickSpacing: allPools[poolIndex].tickSpacing
      }),
      xToY: isXtoY,
      amount: byAmountIn ? amountIn : amountOut,
      estimatedPriceAfterSwap,
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

    const fee = localStorage.getItem('INVARIANT_MAINNET_PRIORITY_FEE')

    if (fee) {
      swapTx = yield* call(
        [marketProgram, marketProgram.addPriorityFee],
        solToMicroLamports(+fee),
        swapTx
      )
    }

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
