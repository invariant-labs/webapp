import {
  SIGNING_SNACKBAR_CONFIG,
  TIMEOUT_ERROR_MESSAGE,
  WRAPPED_SOL_ADDRESS
} from '@store/consts/static'
import { createLoaderKey, ensureError, solToPriorityFee } from '@utils/utils'
import { IWallet, Pair } from '@invariant-labs/sdk'
import { actions as snackbarsActions } from '@store/reducers/snackbars'
import { actions as swapActions } from '@store/reducers/swap'
import { actions as connectionActions } from '@store/reducers/solanaConnection'
import { poolsArraySortedByFees, tokens } from '@store/selectors/pools'
import { network, rpcAddress } from '@store/selectors/solanaConnection'
import { accounts } from '@store/selectors/solanaWallet'
import { swap } from '@store/selectors/swap'
import { NATIVE_MINT, TOKEN_PROGRAM_ID, Token } from '@solana/spl-token'
import {
  Keypair,
  SystemProgram,
  Transaction,
  TransactionExpiredTimeoutError,
  sendAndConfirmRawTransaction
} from '@solana/web3.js'
import { getMarketProgram } from '@utils/web3/programs/amm'
import { call, put, select, takeEvery } from 'typed-redux-saga'
import { getConnection, handleRpcError } from './connection'
import { createAccount, getWallet } from './wallet'
import { closeSnackbar } from 'notistack'

export function* handleSwapWithSOL(): Generator {
  const loaderSwappingTokens = createLoaderKey()
  const loaderSigningTx = createLoaderKey()
  const loaderTxDetails = createLoaderKey()

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
    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)
    const swapPool = allPools.find(
      pool =>
        (tokenFrom.equals(pool.tokenX) && tokenTo.equals(pool.tokenY)) ||
        (tokenFrom.equals(pool.tokenY) && tokenTo.equals(pool.tokenX))
    )

    if (!swapPool) {
      return
    }

    yield put(
      snackbarsActions.add({
        message: 'Swapping tokens',
        variant: 'pending',
        persist: true,
        key: loaderSwappingTokens
      })
    )
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

    const fee = localStorage.getItem('INVARIANT_PRIORITY_FEE')

    if (fee) {
      initialTx = yield* call(
        [marketProgram, marketProgram.addPriorityFee],
        solToPriorityFee(+fee),
        initialTx
      )
    }

    const initialBlockhash = yield* call([connection, connection.getLatestBlockhash])
    initialTx.recentBlockhash = initialBlockhash.blockhash
    initialTx.feePayer = wallet.publicKey

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

    if (fee) {
      swapTx = yield* call(
        [marketProgram, marketProgram.addPriorityFee],
        solToPriorityFee(+fee),
        swapTx
      )
    }

    const swapBlockhash = yield* call([connection, connection.getLatestBlockhash])
    swapTx.recentBlockhash = swapBlockhash.blockhash
    swapTx.feePayer = wallet.publicKey

    let unwrapTx = new Transaction().add(unwrapIx)

    if (fee) {
      unwrapTx = yield* call(
        [marketProgram, marketProgram.addPriorityFee],
        solToPriorityFee(+fee),
        unwrapTx
      )
    }

    const unwrapBlockhash = yield* call([connection, connection.getLatestBlockhash])
    unwrapTx.recentBlockhash = unwrapBlockhash.blockhash
    unwrapTx.feePayer = wallet.publicKey

    yield put(snackbarsActions.add({ ...SIGNING_SNACKBAR_CONFIG, key: loaderSigningTx }))

    const [initialSignedTx, swapSignedTx, unwrapSignedTx] = yield* call(
      [wallet, wallet.signAllTransactions],
      [initialTx, swapTx, unwrapTx]
    )

    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

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

      closeSnackbar(loaderSwappingTokens)
      yield put(snackbarsActions.remove(loaderSwappingTokens))

      return yield put(
        snackbarsActions.add({
          message: 'SOL wrapping failed. Please try again',
          variant: 'error',
          persist: false,
          txid: initialTxid
        })
      )
    }

    const swapTxid = yield* call(
      [connection, connection.sendRawTransaction],
      swapSignedTx.serialize(),
      {
        skipPreflight: false
      }
    )

    yield put(
      snackbarsActions.add({
        message: 'Confirming swap transaction...',
        variant: 'pending',
        persist: true,
        txid: swapTxid,
        key: loaderTxDetails
      })
    )

    const confirmedSwapTx = yield* call([connection, connection.confirmTransaction], {
      blockhash: swapBlockhash.blockhash,
      lastValidBlockHeight: swapBlockhash.lastValidBlockHeight,
      signature: swapTxid
    })

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))

    if (confirmedSwapTx.value.err === null) {
      yield put(swapActions.setSwapSuccess(true))
      yield put(
        snackbarsActions.add({
          message: 'Tokens swapped successfully',
          variant: 'success',
          persist: false,
          txid: swapTxid
        })
      )
    } else {
      yield put(swapActions.setSwapSuccess(false))

      closeSnackbar(loaderSwappingTokens)
      yield put(snackbarsActions.remove(loaderSwappingTokens))

      return yield put(
        snackbarsActions.add({
          message: 'Tokens swapping failed. Please unwrap wrapped SOL in your wallet and try again',
          variant: 'error',
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
          message: 'Wrapped SOL unwrap failed. Try to unwrap it in your wallet',
          variant: 'warning',
          persist: false,
          txid: unwrapTxid
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'SOL unwrapped successfully',
          variant: 'success',
          persist: false,
          txid: unwrapTxid
        })
      )
    }

    closeSnackbar(loaderSwappingTokens)
    yield put(snackbarsActions.remove(loaderSwappingTokens))
  } catch (e) {
    console.log(e)

    yield put(swapActions.setSwapSuccess(false))

    if (e instanceof TransactionExpiredTimeoutError) {
      yield put(
        snackbarsActions.add({
          message: TIMEOUT_ERROR_MESSAGE,
          variant: 'info',
          persist: true,
          txid: e.signature
        })
      )
      yield put(connectionActions.setTimeoutError(true))
    } else {
      yield put(
        snackbarsActions.add({
          message:
            'Failed to send. Please unwrap wrapped SOL in your wallet if you have any and try again',
          variant: 'error',
          persist: false
        })
      )
    }

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))
    closeSnackbar(loaderSwappingTokens)
    yield put(snackbarsActions.remove(loaderSwappingTokens))
    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

    const error = ensureError(e)
    console.log(error)
    yield* call(handleRpcError, error.message)
  }
}

export function* handleSwap(): Generator {
  const loaderSwappingTokens = createLoaderKey()
  const loaderSigningTx = createLoaderKey()
  const loaderTxDetails = createLoaderKey()

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
    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)
    const swapPool = allPools.find(
      pool =>
        (tokenFrom.equals(pool.tokenX) && tokenTo.equals(pool.tokenY)) ||
        (tokenFrom.equals(pool.tokenY) && tokenTo.equals(pool.tokenX))
    )

    if (!swapPool) {
      return
    }

    yield put(
      snackbarsActions.add({
        message: 'Swapping tokens',
        variant: 'pending',
        persist: true,
        key: loaderSwappingTokens
      })
    )

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
    const blockhash = yield* call([connection, connection.getLatestBlockhash])
    swapTx.recentBlockhash = blockhash.blockhash
    swapTx.feePayer = wallet.publicKey

    const fee = localStorage.getItem('INVARIANT_PRIORITY_FEE')

    if (fee) {
      swapTx = yield* call(
        [marketProgram, marketProgram.addPriorityFee],
        solToPriorityFee(+fee),
        swapTx
      )
    }

    yield put(snackbarsActions.add({ ...SIGNING_SNACKBAR_CONFIG, key: loaderSigningTx }))

    const signedTx = yield* call([wallet, wallet.signTransaction], swapTx)

    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))
    console.log('connection', connection)
    const txid = yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
      skipPreflight: false
    })

    yield put(
      snackbarsActions.add({
        message: 'Confirming swap transaction...',
        variant: 'pending',
        persist: true,
        txid: txid,
        key: loaderTxDetails
      })
    )

    const confirmedTx = yield* call([connection, connection.confirmTransaction], {
      blockhash: blockhash.blockhash,
      lastValidBlockHeight: blockhash.lastValidBlockHeight,
      signature: txid
    })

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))

    if (confirmedTx.value.err === null) {
      yield put(swapActions.setSwapSuccess(true))
      yield put(
        snackbarsActions.add({
          message: 'Tokens swapped successfully',
          variant: 'success',
          persist: false,
          txid: txid
        })
      )
    } else {
      yield put(swapActions.setSwapSuccess(false))

      yield put(
        snackbarsActions.add({
          message: 'Tokens swapping failed. Please try again',
          variant: 'error',
          persist: false,
          txid: txid
        })
      )
    }

    closeSnackbar(loaderSwappingTokens)
    yield put(snackbarsActions.remove(loaderSwappingTokens))
  } catch (e) {
    console.log(e)

    yield put(swapActions.setSwapSuccess(false))

    if (e instanceof TransactionExpiredTimeoutError) {
      yield put(
        snackbarsActions.add({
          message: TIMEOUT_ERROR_MESSAGE,
          variant: 'info',
          persist: true,
          txid: e.signature
        })
      )
      yield put(connectionActions.setTimeoutError(true))
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Failed to send. Please try again',
          variant: 'error',
          persist: false
        })
      )
    }

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))
    closeSnackbar(loaderSwappingTokens)
    yield put(snackbarsActions.remove(loaderSwappingTokens))
    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

    const error = ensureError(e)
    yield* call(handleRpcError, error.message)
  }
}

export function* swapHandler(): Generator {
  yield* takeEvery(swapActions.swap, handleSwap)
}
