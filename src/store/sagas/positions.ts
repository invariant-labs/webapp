import {
  SIGNING_SNACKBAR_CONFIG,
  TIMEOUT_ERROR_MESSAGE,
  WRAPPED_SOL_ADDRESS
} from '@store/consts/static'
import {
  createLiquidityPlot,
  createLoaderKey,
  createPlaceholderLiquidityPlot,
  ensureError,
  getPositionByIdAndPoolAddress,
  getPositionsAddressesFromRange,
  getTicksFromPositions,
  solToPriorityFee
} from '@utils/utils'
import { IWallet, Pair } from '@invariant-labs/sdk'
import { ListPoolsResponse, ListType, actions as poolsActions } from '@store/reducers/pools'
import {
  ClosePositionData,
  GetCurrentTicksData,
  InitPositionData,
  PositionWithAddress,
  actions
} from '@store/reducers/positions'
import { actions as connectionActions } from '@store/reducers/solanaConnection'
import { actions as snackbarsActions } from '@store/reducers/snackbars'
import { GuardPredicate } from '@redux-saga/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { poolsArraySortedByFees, tokens } from '@store/selectors/pools'
import { positionsWithPoolsData } from '@store/selectors/positions'
import { network, rpcAddress } from '@store/selectors/solanaConnection'
import { accounts, balance } from '@store/selectors/solanaWallet'
import { NATIVE_MINT, TOKEN_PROGRAM_ID, Token } from '@solana/spl-token'
import {
  Keypair,
  SystemProgram,
  Transaction,
  TransactionExpiredTimeoutError,
  sendAndConfirmRawTransaction
} from '@solana/web3.js'
import { getMarketProgram } from '@utils/web3/programs/amm'
import { all, call, put, select, spawn, take, takeEvery, takeLeading } from 'typed-redux-saga'
import { getConnection, handleRpcError } from './connection'
import { createAccount, getWallet, sleep } from './wallet'
import { closeSnackbar } from 'notistack'
import { ClaimAllFee } from '@invariant-labs/sdk/lib/market'

function* handleInitPositionAndPoolWithSOL(action: PayloadAction<InitPositionData>): Generator {
  const data = action.payload

  if (
    (data.tokenX.toString() === WRAPPED_SOL_ADDRESS && data.xAmount === 0) ||
    (data.tokenY.toString() === WRAPPED_SOL_ADDRESS && data.yAmount === 0)
  ) {
    return yield* call(handleInitPosition, action)
  }
  const loaderCreatePool = createLoaderKey()
  const loaderSigningTx = createLoaderKey()
  try {
    yield put(
      snackbarsActions.add({
        message: 'Creating pool',
        variant: 'pending',
        persist: true,
        key: loaderCreatePool
      })
    )

    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)

    const tokensAccounts = yield* select(accounts)
    const allTokens = yield* select(tokens)

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
        allTokens[data.tokenX.toString()].address.toString() === WRAPPED_SOL_ADDRESS
          ? data.xAmount
          : data.yAmount
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

    let userTokenX =
      allTokens[data.tokenX.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[data.tokenX.toString()]
          ? tokensAccounts[data.tokenX.toString()].address
          : null

    if (userTokenX === null) {
      userTokenX = yield* call(createAccount, data.tokenX)
    }

    let userTokenY =
      allTokens[data.tokenY.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[data.tokenY.toString()]
          ? tokensAccounts[data.tokenY.toString()].address
          : null

    if (userTokenY === null) {
      userTokenY = yield* call(createAccount, data.tokenY)
    }

    let initPositionTx: Transaction
    let poolSigners: Keypair[] = []

    const fee = localStorage.getItem('INVARIANT_PRIORITY_FEE')

    const { transaction, signers } = yield* call(
      [marketProgram, marketProgram.initPoolAndPositionTx],
      {
        pair: new Pair(data.tokenX, data.tokenY, {
          fee: data.fee,
          tickSpacing: data.tickSpacing
        }),
        userTokenX,
        userTokenY,
        lowerTick: data.lowerTick,
        upperTick: data.upperTick,
        liquidityDelta: data.liquidityDelta,
        owner: wallet.publicKey,
        initTick: data.initTick,
        slippage: data.slippage,
        knownPrice: data.knownPrice
      }
    )

    if (fee) {
      initPositionTx = yield* call(
        [marketProgram, marketProgram.addPriorityFee],
        solToPriorityFee(+fee),
        transaction
      )
    } else {
      initPositionTx = transaction
    }

    poolSigners = signers

    let initialTx = new Transaction().add(createIx).add(transferIx).add(initIx)

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

    const initPositionBlockhash = yield* call([connection, connection.getLatestBlockhash])
    initPositionTx.recentBlockhash = initPositionBlockhash.blockhash
    initPositionTx.feePayer = wallet.publicKey

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

    const [initialSignedTx, initPositionSignedTx, unwrapSignedTx] = yield* call(
      [wallet, wallet.signAllTransactions],
      [initialTx, initPositionTx, unwrapTx]
    )

    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

    initialSignedTx.partialSign(wrappedSolAccount)

    if (poolSigners.length) {
      initPositionSignedTx.partialSign(...poolSigners)
    }

    const initialTxid = yield* call(
      sendAndConfirmRawTransaction,
      connection,
      initialSignedTx.serialize(),
      {
        skipPreflight: false
      }
    )

    if (!initialTxid.length) {
      yield put(actions.setInitPositionSuccess(false))

      return yield put(
        snackbarsActions.add({
          message: 'SOL wrapping failed. Please try again',
          variant: 'error',
          persist: false,
          txid: initialTxid
        })
      )
    }

    const initPositionTxid = yield* call(
      sendAndConfirmRawTransaction,
      connection,
      initPositionSignedTx.serialize(),
      {
        skipPreflight: false
      }
    )

    if (!initPositionTxid.length) {
      yield put(actions.setInitPositionSuccess(false))

      closeSnackbar(loaderCreatePool)
      yield put(snackbarsActions.remove(loaderCreatePool))

      return yield put(
        snackbarsActions.add({
          message: 'Position adding failed. Please unwrap wrapped SOL in your wallet and try again',
          variant: 'error',
          persist: false,
          txid: initPositionTxid
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Position added successfully',
          variant: 'success',
          persist: false,
          txid: initPositionTxid
        })
      )

      yield put(actions.getPositionsList())
    }

    const unwrapTxid = yield* call(
      sendAndConfirmRawTransaction,
      connection,
      unwrapSignedTx.serialize(),
      {
        skipPreflight: false
      }
    )

    yield put(actions.setInitPositionSuccess(true))

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
    closeSnackbar(loaderCreatePool)
    yield put(snackbarsActions.remove(loaderCreatePool))
  } catch (e) {
    console.log(e)

    yield put(actions.setInitPositionSuccess(false))
    closeSnackbar(loaderCreatePool)
    yield put(snackbarsActions.remove(loaderCreatePool))
    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

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

    const error = ensureError(e)
    yield* call(handleRpcError, error.message)
  }
}

function* handleInitPositionWithSOL(action: PayloadAction<InitPositionData>): Generator {
  const data = action.payload

  if (
    (data.tokenX.toString() === WRAPPED_SOL_ADDRESS && data.xAmount === 0) ||
    (data.tokenY.toString() === WRAPPED_SOL_ADDRESS && data.yAmount === 0)
  ) {
    return yield* call(handleInitPosition, action)
  }

  // To initialize both the pool and position, separate transactions are necessary, as a single transaction does not have enough space to accommodate all instructions for both pool and position creation with SOL.
  if (data.initPool) {
    return yield* call(handleInitPositionAndPoolWithSOL, action)
  }

  const loaderCreatePosition = createLoaderKey()
  const loaderSigningTx = createLoaderKey()
  const loaderTxDetails = createLoaderKey()
  try {
    yield put(
      snackbarsActions.add({
        message: 'Creating position',
        variant: 'pending',
        persist: true,
        key: loaderCreatePosition
      })
    )

    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)

    const tokensAccounts = yield* select(accounts)
    const allTokens = yield* select(tokens)

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
        allTokens[data.tokenX.toString()].address.toString() === WRAPPED_SOL_ADDRESS
          ? data.xAmount
          : data.yAmount
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

    let userTokenX =
      allTokens[data.tokenX.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[data.tokenX.toString()]
          ? tokensAccounts[data.tokenX.toString()].address
          : null

    if (userTokenX === null) {
      userTokenX = yield* call(createAccount, data.tokenX)
    }

    let userTokenY =
      allTokens[data.tokenY.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[data.tokenY.toString()]
          ? tokensAccounts[data.tokenY.toString()].address
          : null

    if (userTokenY === null) {
      userTokenY = yield* call(createAccount, data.tokenY)
    }

    const poolSigners: Keypair[] = []

    let combinedTransaction = new Transaction()

    combinedTransaction.add(createIx).add(transferIx).add(initIx)

    const fee = localStorage.getItem('INVARIANT_PRIORITY_FEE')

    const initPositionTx = yield* call([marketProgram, marketProgram.initPositionTx], {
      pair: new Pair(data.tokenX, data.tokenY, {
        fee: data.fee,
        tickSpacing: data.tickSpacing
      }),
      userTokenX,
      userTokenY,
      lowerTick: data.lowerTick,
      upperTick: data.upperTick,
      liquidityDelta: data.liquidityDelta,
      owner: wallet.publicKey,
      slippage: data.slippage,
      knownPrice: data.knownPrice
    })

    combinedTransaction.add(initPositionTx)
    combinedTransaction.add(unwrapIx)

    if (fee) {
      combinedTransaction = yield* call(
        [marketProgram, marketProgram.addPriorityFee],
        solToPriorityFee(+fee),
        combinedTransaction
      )
    }

    const blockhash = yield* call([connection, connection.getLatestBlockhash])
    combinedTransaction.recentBlockhash = blockhash.blockhash
    combinedTransaction.feePayer = wallet.publicKey

    yield put(snackbarsActions.add({ ...SIGNING_SNACKBAR_CONFIG, key: loaderSigningTx }))

    const signedTx = yield* call([wallet, wallet.signTransaction], combinedTransaction)

    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

    signedTx.partialSign(wrappedSolAccount)

    if (poolSigners.length) {
      signedTx.partialSign(...poolSigners)
    }

    const txId = yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
      skipPreflight: false
    })

    yield put(
      snackbarsActions.add({
        message: 'Confirming create position transaction...',
        variant: 'pending',
        persist: true,
        txid: txId,
        key: loaderTxDetails
      })
    )

    const confirmedTx = yield* call([connection, connection.confirmTransaction], {
      blockhash: blockhash.blockhash,
      lastValidBlockHeight: blockhash.lastValidBlockHeight,
      signature: txId
    })

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))

    if (confirmedTx.value.err === null) {
      yield put(
        snackbarsActions.add({
          message: 'Position added successfully',
          variant: 'success',
          persist: false,
          txid: txId
        })
      )

      yield put(actions.getPositionsList())
    } else {
      yield put(actions.setInitPositionSuccess(false))

      closeSnackbar(loaderCreatePosition)
      yield put(snackbarsActions.remove(loaderCreatePosition))

      return yield put(
        snackbarsActions.add({
          message: 'Position adding failed. Please try again',
          variant: 'error',
          persist: false,
          txid: txId
        })
      )
    }

    yield put(actions.setInitPositionSuccess(true))

    closeSnackbar(loaderCreatePosition)
    yield put(snackbarsActions.remove(loaderCreatePosition))
  } catch (e) {
    console.log(e)

    yield put(actions.setInitPositionSuccess(false))

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))
    closeSnackbar(loaderCreatePosition)
    yield put(snackbarsActions.remove(loaderCreatePosition))
    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

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

    const error = ensureError(e)
    console.log(error)
    yield* call(handleRpcError, error.message)
  }
}

export function* handleInitPosition(action: PayloadAction<InitPositionData>): Generator {
  const loaderCreatePosition = createLoaderKey()
  const loaderSigningTx = createLoaderKey()
  const loaderTxDetails = createLoaderKey()

  try {
    const allTokens = yield* select(tokens)

    if (
      (allTokens[action.payload.tokenX.toString()].address.toString() === WRAPPED_SOL_ADDRESS &&
        action.payload.xAmount !== 0) ||
      (allTokens[action.payload.tokenY.toString()].address.toString() === WRAPPED_SOL_ADDRESS &&
        action.payload.yAmount !== 0)
    ) {
      return yield* call(handleInitPositionWithSOL, action)
    }

    yield put(
      snackbarsActions.add({
        message: 'Creating position',
        variant: 'pending',
        persist: true,
        key: loaderCreatePosition
      })
    )

    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)

    const tokensAccounts = yield* select(accounts)

    let userTokenX = tokensAccounts[action.payload.tokenX.toString()]
      ? tokensAccounts[action.payload.tokenX.toString()].address
      : null

    if (userTokenX === null) {
      userTokenX = yield* call(createAccount, action.payload.tokenX)
    }

    let userTokenY = tokensAccounts[action.payload.tokenY.toString()]
      ? tokensAccounts[action.payload.tokenY.toString()].address
      : null

    if (userTokenY === null) {
      userTokenY = yield* call(createAccount, action.payload.tokenY)
    }

    let tx: Transaction
    let poolSigners: Keypair[] = []

    const fee = localStorage.getItem('INVARIANT_PRIORITY_FEE')

    if (action.payload.initPool) {
      const { transaction, signers } = yield* call(
        [marketProgram, marketProgram.initPoolAndPositionTx],
        {
          pair: new Pair(action.payload.tokenX, action.payload.tokenY, {
            fee: action.payload.fee,
            tickSpacing: action.payload.tickSpacing
          }),
          userTokenX,
          userTokenY,
          lowerTick: action.payload.lowerTick,
          upperTick: action.payload.upperTick,
          liquidityDelta: action.payload.liquidityDelta,
          owner: wallet.publicKey,
          initTick: action.payload.initTick,
          slippage: action.payload.slippage,
          knownPrice: action.payload.knownPrice
        }
      )

      tx = transaction
      poolSigners = signers
    } else {
      tx = yield* call([marketProgram, marketProgram.initPositionTx], {
        pair: new Pair(action.payload.tokenX, action.payload.tokenY, {
          fee: action.payload.fee,
          tickSpacing: action.payload.tickSpacing
        }),
        userTokenX,
        userTokenY,
        lowerTick: action.payload.lowerTick,
        upperTick: action.payload.upperTick,
        liquidityDelta: action.payload.liquidityDelta,
        owner: wallet.publicKey,
        slippage: action.payload.slippage,
        knownPrice: action.payload.knownPrice
      })
    }

    if (fee) {
      tx = yield* call([marketProgram, marketProgram.addPriorityFee], solToPriorityFee(+fee), tx)
    }

    const blockhash = yield* call([connection, connection.getLatestBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey

    yield put(snackbarsActions.add({ ...SIGNING_SNACKBAR_CONFIG, key: loaderSigningTx }))

    const signedTx = yield* call([wallet, wallet.signTransaction], tx)

    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

    if (poolSigners.length) {
      signedTx.partialSign(...poolSigners)
    }

    const txId = yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
      skipPreflight: false
    })

    yield put(
      snackbarsActions.add({
        message: 'Confirming create position transaction...',
        variant: 'pending',
        persist: true,
        txid: txId,
        key: loaderTxDetails
      })
    )

    const confirmedTx = yield* call([connection, connection.confirmTransaction], {
      blockhash: blockhash.blockhash,
      lastValidBlockHeight: blockhash.lastValidBlockHeight,
      signature: txId
    })

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))

    if (confirmedTx.value.err === null) {
      yield put(
        snackbarsActions.add({
          message: 'Position added successfully',
          variant: 'success',
          persist: false,
          txid: txId
        })
      )

      yield put(actions.getPositionsList())
    } else {
      yield put(actions.setInitPositionSuccess(false))

      closeSnackbar(loaderCreatePosition)
      yield put(snackbarsActions.remove(loaderCreatePosition))

      return yield put(
        snackbarsActions.add({
          message: 'Position adding failed. Please try again',
          variant: 'error',
          persist: false,
          txid: txId
        })
      )
    }

    yield put(actions.setInitPositionSuccess(true))

    closeSnackbar(loaderCreatePosition)
    yield put(snackbarsActions.remove(loaderCreatePosition))
  } catch (e) {
    console.log(e)

    yield put(actions.setInitPositionSuccess(false))

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))
    closeSnackbar(loaderCreatePosition)
    yield put(snackbarsActions.remove(loaderCreatePosition))
    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

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

    const error = ensureError(e)
    console.log(error)
    yield* call(handleRpcError, error.message)
  }
}

export function* handleGetCurrentPlotTicks(action: PayloadAction<GetCurrentTicksData>): Generator {
  const allPools = yield* select(poolsArraySortedByFees)
  const allTokens = yield* select(tokens)
  const wallet = yield* call(getWallet)
  const poolIndex = action.payload.poolIndex

  const xDecimal = allTokens[allPools[poolIndex].tokenX.toString()].decimals
  const yDecimal = allTokens[allPools[poolIndex].tokenY.toString()].decimals

  try {
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)

    const rawTicks = yield* call(
      [marketProgram, marketProgram.getAllTicks],
      new Pair(allPools[poolIndex].tokenX, allPools[poolIndex].tokenY, {
        fee: allPools[poolIndex].fee.v,
        tickSpacing: allPools[poolIndex].tickSpacing
      })
    )

    const ticksData = createLiquidityPlot(
      rawTicks,
      allPools[poolIndex],
      action.payload.isXtoY,
      xDecimal,
      yDecimal
    )

    yield put(actions.setPlotTicks(ticksData))
  } catch (e) {
    console.log(e)
    const error = ensureError(e)
    console.log(error)

    const data = createPlaceholderLiquidityPlot(
      action.payload.isXtoY,
      10,
      allPools[poolIndex].tickSpacing,
      xDecimal,
      yDecimal
    )
    yield put(actions.setErrorPlotTicks(data))

    yield* call(handleRpcError, (error as Error).message)
  }
}

export function* handleGetPositionsList() {
  try {
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const wallet = yield* call(getWallet)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)

    const { head } = yield* call([marketProgram, marketProgram.getPositionList], wallet.publicKey)

    const { list, addresses } = yield* all({
      list: call(
        [marketProgram, marketProgram.getPositionsFromRange],
        wallet.publicKey,
        0,
        head - 1
      ),
      addresses: call(getPositionsAddressesFromRange, marketProgram, wallet.publicKey, 0, head - 1)
    })

    const pools = new Set(list.map(pos => pos.pool.toString()))

    yield* put(
      poolsActions.getPoolsDataForList({
        addresses: Array.from(pools),
        listType: ListType.POSITIONS
      })
    )
    yield* take(poolsActions.addPoolsForList.type)

    const poolsList = yield* select(poolsArraySortedByFees)

    const positions = list.map((position, index) => {
      return {
        ...position,
        address: addresses[index]
      }
    })

    const positionsWithTicks: PositionWithAddress[] = []

    const poolMap = new Map(poolsList.map(pool => [pool.address.toString(), pool]))

    const getTicksData = list
      .map((position, index) => {
        const pool = poolMap.get(position.pool.toString())
        if (!pool) return null

        return {
          pair: new Pair(pool.tokenX, pool.tokenY, {
            fee: pool.fee.v,
            tickSpacing: pool.tickSpacing
          }),
          position: { ...position, address: addresses[index] }
        }
      })
      .filter(Boolean) as { pair: Pair; position: PositionWithAddress }[]

    const ticks = yield* call(getTicksFromPositions, marketProgram, getTicksData)

    let offset = 0

    for (let i = 0; i < positions.length; i++) {
      if (!ticks[i] || !ticks[i + 1]) {
        continue
      }
      const lowerTick = ticks[offset]!
      const upperTick = ticks[offset + 1]!

      positionsWithTicks[i] = {
        ...positions[i],
        lowerTick: lowerTick,
        upperTick: upperTick,
        ticksLoading: false
      }
      offset += 2
    }

    yield* put(
      poolsActions.getPoolsDataForList({
        addresses: Array.from(pools),
        listType: ListType.POSITIONS
      })
    )

    const pattern: GuardPredicate<PayloadAction<ListPoolsResponse>> = (
      action
    ): action is PayloadAction<ListPoolsResponse> => {
      return (
        typeof action?.payload?.listType !== 'undefined' &&
        action.payload.listType === ListType.POSITIONS
      )
    }

    yield* take(pattern)

    yield* put(actions.setPositionsList(positionsWithTicks))
  } catch (e: unknown) {
    const error = ensureError(e)
    console.log(error)

    yield* put(actions.setPositionsList([]))

    yield* call(handleRpcError, error.message)
  }
}

export function* handleClaimFeeWithSOL(positionIndex: number) {
  const loaderClaimFee = createLoaderKey()
  const loaderSigningTx = createLoaderKey()
  const loaderTxDetails = createLoaderKey()

  try {
    yield put(
      snackbarsActions.add({
        message: 'Claiming fee',
        variant: 'pending',
        persist: true,
        key: loaderClaimFee
      })
    )

    const connection = yield* call(getConnection)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const wallet = yield* call(getWallet)

    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)

    const allPositionsData = yield* select(positionsWithPoolsData)
    const tokensAccounts = yield* select(accounts)
    const allTokens = yield* select(tokens)

    const wrappedSolAccount = Keypair.generate()

    const createIx = SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: wrappedSolAccount.publicKey,
      lamports: yield* call(Token.getMinBalanceRentForExemptAccount, connection),
      space: 165,
      programId: TOKEN_PROGRAM_ID
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

    const positionForIndex = allPositionsData[positionIndex].poolData

    let userTokenX =
      allTokens[positionForIndex.tokenX.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[positionForIndex.tokenX.toString()]
          ? tokensAccounts[positionForIndex.tokenX.toString()].address
          : null

    if (userTokenX === null) {
      userTokenX = yield* call(createAccount, positionForIndex.tokenX)
    }

    let userTokenY =
      allTokens[positionForIndex.tokenY.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[positionForIndex.tokenY.toString()]
          ? tokensAccounts[positionForIndex.tokenY.toString()].address
          : null

    if (userTokenY === null) {
      userTokenY = yield* call(createAccount, positionForIndex.tokenY)
    }

    const ix = yield* call([marketProgram, marketProgram.claimFeeInstruction], {
      pair: new Pair(positionForIndex.tokenX, positionForIndex.tokenY, {
        fee: positionForIndex.fee.v,
        tickSpacing: positionForIndex.tickSpacing
      }),
      userTokenX,
      userTokenY,
      owner: wallet.publicKey,
      index: positionIndex
    })

    let tx = new Transaction().add(createIx).add(initIx).add(ix).add(unwrapIx)

    const fee = localStorage.getItem('INVARIANT_PRIORITY_FEE')

    if (fee) {
      tx = yield* call([marketProgram, marketProgram.addPriorityFee], solToPriorityFee(+fee), tx)
    }

    const blockhash = yield* call([connection, connection.getLatestBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey

    yield put(snackbarsActions.add({ ...SIGNING_SNACKBAR_CONFIG, key: loaderSigningTx }))

    const signedTx = yield* call([wallet, wallet.signTransaction], tx)

    signedTx.partialSign(wrappedSolAccount)

    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

    const txId = yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
      skipPreflight: false
    })

    yield put(
      snackbarsActions.add({
        message: 'Confirming claim fee transaction...',
        variant: 'pending',
        persist: true,
        txid: txId,
        key: loaderTxDetails
      })
    )

    const confirmedTx = yield* call([connection, connection.confirmTransaction], {
      blockhash: blockhash.blockhash,
      lastValidBlockHeight: blockhash.lastValidBlockHeight,
      signature: txId
    })

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))

    if (confirmedTx.value.err === null) {
      yield put(actions.getPositionsList())

      yield put(
        snackbarsActions.add({
          message: 'Fee claimed successfully',
          variant: 'success',
          persist: false,
          txid: txId
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Failed to claim fee. Please try again',
          variant: 'error',
          persist: false,
          txid: txId
        })
      )
    }

    yield put(actions.getSinglePosition({ index: positionIndex }))

    closeSnackbar(loaderClaimFee)
    yield put(snackbarsActions.remove(loaderClaimFee))
    yield put(actions.setFeesLoader(false))
  } catch (e) {
    console.log(e)
    yield put(actions.setFeesLoader(false))
    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))
    closeSnackbar(loaderClaimFee)
    yield put(snackbarsActions.remove(loaderClaimFee))
    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

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

    const error = ensureError(e)
    console.log(error)
    yield* call(handleRpcError, error.message)
  }
}

export function* handleClaimFee(action: PayloadAction<number>) {
  const loaderClaimFee = createLoaderKey()
  const loaderSigningTx = createLoaderKey()
  const loaderTxDetails = createLoaderKey()

  try {
    const allTokens = yield* select(tokens)
    const allPositionsData = yield* select(positionsWithPoolsData)
    const positionForIndex = allPositionsData[action.payload].poolData

    if (
      allTokens[positionForIndex.tokenX.toString()].address.toString() === WRAPPED_SOL_ADDRESS ||
      allTokens[positionForIndex.tokenY.toString()].address.toString() === WRAPPED_SOL_ADDRESS
    ) {
      return yield* call(handleClaimFeeWithSOL, action.payload)
    }

    yield put(
      snackbarsActions.add({
        message: 'Claiming fee',
        variant: 'pending',
        persist: true,
        key: loaderClaimFee
      })
    )

    const connection = yield* call(getConnection)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const wallet = yield* call(getWallet)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)

    const tokensAccounts = yield* select(accounts)

    let userTokenX = tokensAccounts[positionForIndex.tokenX.toString()]
      ? tokensAccounts[positionForIndex.tokenX.toString()].address
      : null

    if (userTokenX === null) {
      userTokenX = yield* call(createAccount, positionForIndex.tokenX)
    }

    let userTokenY = tokensAccounts[positionForIndex.tokenY.toString()]
      ? tokensAccounts[positionForIndex.tokenY.toString()].address
      : null

    if (userTokenY === null) {
      userTokenY = yield* call(createAccount, positionForIndex.tokenY)
    }

    const ix = yield* call([marketProgram, marketProgram.claimFeeInstruction], {
      pair: new Pair(positionForIndex.tokenX, positionForIndex.tokenY, {
        fee: positionForIndex.fee.v,
        tickSpacing: positionForIndex.tickSpacing
      }),
      userTokenX,
      userTokenY,
      owner: wallet.publicKey,
      index: action.payload
    })

    let tx = new Transaction().add(ix)

    const fee = localStorage.getItem('INVARIANT_PRIORITY_FEE')

    if (fee) {
      tx = yield* call([marketProgram, marketProgram.addPriorityFee], solToPriorityFee(+fee), tx)
    }

    const blockhash = yield* call([connection, connection.getLatestBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey

    yield put(snackbarsActions.add({ ...SIGNING_SNACKBAR_CONFIG, key: loaderSigningTx }))

    const signedTx = yield* call([wallet, wallet.signTransaction], tx)

    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

    const txId = yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
      skipPreflight: false
    })

    yield put(
      snackbarsActions.add({
        message: 'Confirming claim fee transaction...',
        variant: 'pending',
        persist: true,
        txid: txId,
        key: loaderTxDetails
      })
    )

    const confirmedTx = yield* call([connection, connection.confirmTransaction], {
      blockhash: blockhash.blockhash,
      lastValidBlockHeight: blockhash.lastValidBlockHeight,
      signature: txId
    })

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))

    if (confirmedTx.value.err === null) {
      yield put(actions.getPositionsList())

      yield put(
        snackbarsActions.add({
          message: 'Fee claimed successfully',
          variant: 'success',
          persist: false,
          txid: txId
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Failed to claim fee. Please try again',
          variant: 'error',
          persist: false,
          txid: txId
        })
      )
    }

    yield put(actions.getSinglePosition({ index: action.payload }))

    closeSnackbar(loaderClaimFee)
    yield put(snackbarsActions.remove(loaderClaimFee))
    yield put(actions.setFeesLoader(false))
  } catch (e) {
    console.log(e)
    yield put(actions.setFeesLoader(false))
    closeSnackbar(loaderClaimFee)
    yield put(snackbarsActions.remove(loaderClaimFee))
    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

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

    const error = ensureError(e)
    console.log(error)
    yield* call(handleRpcError, error.message)
  }
}

export function* handleClosePositionWithSOL(data: ClosePositionData) {
  const loaderClosePosition = createLoaderKey()
  const loaderSigningTx = createLoaderKey()
  const loaderTxDetails = createLoaderKey()

  try {
    yield put(
      snackbarsActions.add({
        message: 'Closing position',
        variant: 'pending',
        persist: true,
        key: loaderClosePosition
      })
    )

    const connection = yield* call(getConnection)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const wallet = yield* call(getWallet)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)

    const allPositionsData = yield* select(positionsWithPoolsData)
    const tokensAccounts = yield* select(accounts)
    const allTokens = yield* select(tokens)
    const solbalance1 = yield* select(balance)
    console.log('solbalance1', solbalance1.toString())
    const wrappedSolAccount = Keypair.generate()

    const createIx = SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: wrappedSolAccount.publicKey,
      lamports: yield* call(Token.getMinBalanceRentForExemptAccount, connection),
      space: 165,
      programId: TOKEN_PROGRAM_ID
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

    const positionForIndex = allPositionsData[data.positionIndex].poolData

    let userTokenX =
      allTokens[positionForIndex.tokenX.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[positionForIndex.tokenX.toString()]
          ? tokensAccounts[positionForIndex.tokenX.toString()].address
          : null

    if (userTokenX === null) {
      userTokenX = yield* call(createAccount, positionForIndex.tokenX)
    }

    let userTokenY =
      allTokens[positionForIndex.tokenY.toString()].address.toString() === WRAPPED_SOL_ADDRESS
        ? wrappedSolAccount.publicKey
        : tokensAccounts[positionForIndex.tokenY.toString()]
          ? tokensAccounts[positionForIndex.tokenY.toString()].address
          : null

    if (userTokenY === null) {
      userTokenY = yield* call(createAccount, positionForIndex.tokenY)
    }

    const ix = yield* call([marketProgram, marketProgram.removePositionInstruction], {
      pair: new Pair(positionForIndex.tokenX, positionForIndex.tokenY, {
        fee: positionForIndex.fee.v,
        tickSpacing: positionForIndex.tickSpacing
      }),
      owner: wallet.publicKey,
      index: data.positionIndex,
      userTokenX,
      userTokenY
    })

    let tx: Transaction

    tx = new Transaction().add(createIx).add(initIx).add(ix).add(unwrapIx)

    const fee = localStorage.getItem('INVARIANT_PRIORITY_FEE')

    if (fee) {
      tx = yield* call([marketProgram, marketProgram.addPriorityFee], solToPriorityFee(+fee), tx)
    }

    const blockhash = yield* call([connection, connection.getLatestBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey

    yield put(snackbarsActions.add({ ...SIGNING_SNACKBAR_CONFIG, key: loaderSigningTx }))

    const signedTx = yield* call([wallet, wallet.signTransaction], tx)

    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

    signedTx.partialSign(wrappedSolAccount)

    const txId = yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
      skipPreflight: false
    })

    yield put(
      snackbarsActions.add({
        message: 'Confirming close position transaction...',
        variant: 'pending',
        persist: true,
        txid: txId,
        key: loaderTxDetails
      })
    )

    const confirmedTx = yield* call([connection, connection.confirmTransaction], {
      blockhash: blockhash.blockhash,
      lastValidBlockHeight: blockhash.lastValidBlockHeight,
      signature: txId
    })

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))

    yield* call(sleep, 3000)

    if (confirmedTx.value.err === null) {
      yield put(
        snackbarsActions.add({
          message: 'Position closed successfully',
          variant: 'success',
          persist: false,
          txid: txId
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Failed to close position. Please try again',
          variant: 'error',
          persist: false,
          txid: txId
        })
      )
    }

    yield put(actions.getPositionsList())

    data.onSuccess()

    closeSnackbar(loaderClosePosition)
    yield put(snackbarsActions.remove(loaderClosePosition))
  } catch (e) {
    console.log(e)

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))
    closeSnackbar(loaderClosePosition)
    yield put(snackbarsActions.remove(loaderClosePosition))
    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

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

    const error = ensureError(e)
    console.log(error)
    yield* call(handleRpcError, error.message)
  }
}

export function* handleClosePosition(action: PayloadAction<ClosePositionData>) {
  const loaderClosePosition = createLoaderKey()
  const loaderSigningTx = createLoaderKey()
  const loaderTxDetails = createLoaderKey()

  try {
    const allTokens = yield* select(tokens)
    const allPositionsData = yield* select(positionsWithPoolsData)
    const positionForIndex = allPositionsData[action.payload.positionIndex].poolData

    if (
      allTokens[positionForIndex.tokenX.toString()].address.toString() === WRAPPED_SOL_ADDRESS ||
      allTokens[positionForIndex.tokenY.toString()].address.toString() === WRAPPED_SOL_ADDRESS
    ) {
      return yield* call(handleClosePositionWithSOL, action.payload)
    }

    yield put(
      snackbarsActions.add({
        message: 'Closing position',
        variant: 'pending',
        persist: true,
        key: loaderClosePosition
      })
    )

    const connection = yield* call(getConnection)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const wallet = yield* call(getWallet)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)

    const tokensAccounts = yield* select(accounts)

    let userTokenX = tokensAccounts[positionForIndex.tokenX.toString()]
      ? tokensAccounts[positionForIndex.tokenX.toString()].address
      : null

    if (userTokenX === null) {
      userTokenX = yield* call(createAccount, positionForIndex.tokenX)
    }

    let userTokenY = tokensAccounts[positionForIndex.tokenY.toString()]
      ? tokensAccounts[positionForIndex.tokenY.toString()].address
      : null

    if (userTokenY === null) {
      userTokenY = yield* call(createAccount, positionForIndex.tokenY)
    }

    const ix = yield* call([marketProgram, marketProgram.removePositionInstruction], {
      pair: new Pair(positionForIndex.tokenX, positionForIndex.tokenY, {
        fee: positionForIndex.fee.v,
        tickSpacing: positionForIndex.tickSpacing
      }),
      owner: wallet.publicKey,
      index: action.payload.positionIndex,
      userTokenX,
      userTokenY
    })

    let tx: Transaction

    tx = new Transaction().add(ix)
    const fee = localStorage.getItem('INVARIANT_PRIORITY_FEE')

    if (fee) {
      tx = yield* call([marketProgram, marketProgram.addPriorityFee], solToPriorityFee(+fee), tx)
    }

    const blockhash = yield* call([connection, connection.getLatestBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey

    yield put(snackbarsActions.add({ ...SIGNING_SNACKBAR_CONFIG, key: loaderSigningTx }))

    const signedTx = yield* call([wallet, wallet.signTransaction], tx)

    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

    const txId = yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
      skipPreflight: false
    })

    yield put(
      snackbarsActions.add({
        message: 'Confirming close position transaction...',
        variant: 'pending',
        persist: true,
        txid: txId,
        key: loaderTxDetails
      })
    )

    const confirmedTx = yield* call([connection, connection.confirmTransaction], {
      blockhash: blockhash.blockhash,
      lastValidBlockHeight: blockhash.lastValidBlockHeight,
      signature: txId
    })

    yield* call(sleep, 3000)

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))

    if (confirmedTx.value.err === null) {
      yield put(
        snackbarsActions.add({
          message: 'Position closed successfully',
          variant: 'success',
          persist: false,
          txid: txId
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Failed to close position. Please try again',
          variant: 'error',
          persist: false,
          txid: txId
        })
      )
    }

    yield* put(actions.getPositionsList())

    action.payload.onSuccess()

    closeSnackbar(loaderClosePosition)
    yield put(snackbarsActions.remove(loaderClosePosition))
  } catch (e) {
    console.log(e)

    closeSnackbar(loaderTxDetails)
    yield put(snackbarsActions.remove(loaderTxDetails))
    closeSnackbar(loaderClosePosition)
    yield put(snackbarsActions.remove(loaderClosePosition))
    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

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

    const error = ensureError(e)
    console.log(error)
    yield* call(handleRpcError, error.message)
  }
}

export function* handleGetSinglePosition(action: PayloadAction<{ index: number }>) {
  try {
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const wallet = yield* call(getWallet)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)

    const poolsList = yield* select(poolsArraySortedByFees)

    const position = yield* call(
      [marketProgram, marketProgram.getPosition],
      wallet.publicKey,
      action.payload.index
    )

    const pool = poolsList.find(pool => pool.address.toString() === position.pool.toString())
    if (!pool) {
      return
    }

    const pair = new Pair(pool.tokenX, pool.tokenY, {
      fee: pool.fee.v,
      tickSpacing: pool.tickSpacing
    })

    yield put(poolsActions.getPoolData(pair))

    const { lowerTick, upperTick } = yield* all({
      lowerTick: call([marketProgram, marketProgram.getTick], pair, position.lowerTickIndex),
      upperTick: call([marketProgram, marketProgram.getTick], pair, position.upperTickIndex)
    })

    yield put(
      actions.setSinglePosition({
        index: action.payload.index,
        position,
        lowerTick,
        upperTick
      })
    )
  } catch (e: unknown) {
    const error = ensureError(e)
    console.log(error)

    yield* call(handleRpcError, error.message)
  }
}

export function* handleClaimAllFees() {
  const loaderClaimAllFees = createLoaderKey()
  const loaderSigningTx = createLoaderKey()

  try {
    const connection = yield* call(getConnection)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const wallet = yield* call(getWallet)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)

    const allPositionsData = yield* select(positionsWithPoolsData)
    const tokensAccounts = yield* select(accounts)

    if (allPositionsData.length === 0) {
      return
    }
    if (allPositionsData.length === 1) {
      const claimFeeAction = actions.claimFee(0)
      return yield* call(handleClaimFee, claimFeeAction)
    }

    yield* put(actions.setAllClaimLoader(true))
    yield put(
      snackbarsActions.add({
        message: 'Claiming all fees',
        variant: 'pending',
        persist: true,
        key: loaderClaimAllFees
      })
    )

    for (const position of allPositionsData) {
      const pool = allPositionsData[position.positionIndex].poolData

      if (!tokensAccounts[pool.tokenX.toString()]) {
        yield* call(createAccount, pool.tokenX)
      }
      if (!tokensAccounts[pool.tokenY.toString()]) {
        yield* call(createAccount, pool.tokenY)
      }
    }

    const formattedPositions = allPositionsData.map(position => ({
      pair: new Pair(position.poolData.tokenX, position.poolData.tokenY, {
        fee: position.poolData.fee.v,
        tickSpacing: position.poolData.tickSpacing
      }),
      index: position.positionIndex,
      lowerTickIndex: position.lowerTickIndex,
      upperTickIndex: position.upperTickIndex
    }))

    const txs = yield* call([marketProgram, marketProgram.claimAllFeesTxs], {
      owner: wallet.publicKey,
      positions: formattedPositions
    } as ClaimAllFee)

    yield put(snackbarsActions.add({ ...SIGNING_SNACKBAR_CONFIG, key: loaderSigningTx }))

    for (const { tx, additionalSigner } of txs) {
      const blockhash = yield* call([connection, connection.getLatestBlockhash])
      tx.recentBlockhash = blockhash.blockhash
      tx.feePayer = wallet.publicKey

      let signedTx: Transaction
      if (additionalSigner) {
        const partiallySignedTx = yield* call([wallet, wallet.signTransaction], tx)
        partiallySignedTx.partialSign(additionalSigner)
        signedTx = partiallySignedTx
      } else {
        signedTx = yield* call([wallet, wallet.signTransaction], tx)
      }

      const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
        skipPreflight: false
      })

      if (!txid.length) {
        yield put(
          snackbarsActions.add({
            message: 'Failed to claim some fees. Please try again.',
            variant: 'error',
            persist: false,
            txid
          })
        )
      }
    }

    yield put(
      snackbarsActions.add({
        message: 'All fees claimed successfully.',
        variant: 'success',
        persist: false
      })
    )

    for (const position of formattedPositions) {
      yield put(actions.getSinglePosition({ index: position.index }))
    }

    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))
    closeSnackbar(loaderClaimAllFees)
    yield put(snackbarsActions.remove(loaderClaimAllFees))

    yield put(actions.getPositionsList())
  } catch (e) {
    console.log(e)
    yield* put(actions.setAllClaimLoader(false))

    closeSnackbar(loaderClaimAllFees)
    yield put(snackbarsActions.remove(loaderClaimAllFees))
    closeSnackbar(loaderSigningTx)
    yield put(snackbarsActions.remove(loaderSigningTx))

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
          message: 'Failed to claim fees. Please try again.',
          variant: 'error',
          persist: false
        })
      )
    }

    const error = ensureError(e)
    console.log(error)
    yield* call(handleRpcError, error.message)
  }
}

export function* handleGetPreviewPosition(action: PayloadAction<string>) {
  try {
    const parts = action.payload.split('_')
    if (parts.length !== 2) {
      throw new Error('Invalid position id')
    }
    const [id, poolAddress] = parts

    const wallet = yield* call(getWallet)
    const networkType = yield* select(network)
    const rpc = yield* select(rpcAddress)
    const marketProgram = yield* call(getMarketProgram, networkType, rpc, wallet as IWallet)

    const position = yield* call(getPositionByIdAndPoolAddress, marketProgram, id, poolAddress)

    if (position) {
      yield* put(
        poolsActions.getPoolsDataForList({
          addresses: [position.pool.toString()],
          listType: ListType.POSITIONS
        })
      )
    }
    const poolsList = yield* select(poolsArraySortedByFees)

    const pool = poolsList.find(pool => pool.address.toString() === poolAddress.toString())
    if (!pool || !position) {
      return
    }

    const pair = new Pair(pool.tokenX, pool.tokenY, {
      fee: pool.fee.v,
      tickSpacing: pool.tickSpacing
    })

    const { lowerTick, upperTick } = yield* all({
      lowerTick: call([marketProgram, marketProgram.getTick], pair, position.lowerTickIndex),
      upperTick: call([marketProgram, marketProgram.getTick], pair, position.upperTickIndex)
    })

    yield* put(actions.setPosition({ ...position, lowerTick, upperTick, ticksLoading: false }))
  } catch (e) {
    const error = ensureError(e)
    console.log(error)

    yield* put(actions.setPosition(null))
  }
}
export function* initPositionHandler(): Generator {
  yield* takeEvery(actions.initPosition, handleInitPosition)
}
export function* getCurrentPlotTicksHandler(): Generator {
  yield* takeLeading(actions.getCurrentPlotTicks, handleGetCurrentPlotTicks)
}
export function* getPositionsListHandler(): Generator {
  yield* takeLeading(actions.getPositionsList, handleGetPositionsList)
}
export function* claimFeeHandler(): Generator {
  yield* takeEvery(actions.claimFee, handleClaimFee)
}

export function* claimAllFeeHandler(): Generator {
  yield* takeEvery(actions.claimAllFee, handleClaimAllFees)
}

export function* closePositionHandler(): Generator {
  yield* takeEvery(actions.closePosition, handleClosePosition)
}
export function* getSinglePositionHandler(): Generator {
  yield* takeEvery(actions.getSinglePosition, handleGetSinglePosition)
}

export function* getPositionHandler(): Generator {
  yield* takeEvery(actions.getPreviewPosition, handleGetPreviewPosition)
}

export function* positionsSaga(): Generator {
  yield all(
    [
      initPositionHandler,
      getCurrentPlotTicksHandler,
      getPositionsListHandler,
      claimAllFeeHandler,
      claimFeeHandler,
      closePositionHandler,
      getSinglePositionHandler,
      getPositionHandler
    ].map(spawn)
  )
}
