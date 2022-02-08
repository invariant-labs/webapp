import { call, put, takeEvery, take, select, all, spawn, takeLatest } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions as poolsActions } from '@reducers/pools'
import { createAccount, getWallet, sleep } from './wallet'
import { getMarketProgram } from '@web3/programs/amm'
import { getConnection } from './connection'
import {
  actions,
  ClosePositionData,
  GetCurrentTicksData,
  InitPositionData
} from '@reducers/positions'
import { PayloadAction } from '@reduxjs/toolkit'
import { poolsArraySortedByFees, tokens } from '@selectors/pools'
import { Pair } from '@invariant-labs/sdk'
import { createLiquidityPlot, createPlaceholderLiquidityPlot } from '@consts/utils'
import { accounts } from '@selectors/solanaWallet'
import {
  Transaction,
  sendAndConfirmRawTransaction,
  Keypair,
  SystemProgram,
  PublicKey
} from '@solana/web3.js'
import { NATIVE_MINT, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { WRAPPED_SOL_ADDRESS } from '@consts/static'
import { positionsWithPoolsData, singlePositionData } from '@selectors/positions'
import BN from 'bn.js'

export function* createPool(
  tokenX: PublicKey,
  tokenY: PublicKey,
  fee: BN,
  initTick?: number
): Generator {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  const marketProgram = yield* call(getMarketProgram)

  const { transaction: tx, signers } = yield* call([marketProgram, marketProgram.createPoolTx], {
    pair: new Pair(tokenX, tokenY, { fee: fee }),
    initTick: initTick
  })
  const blockhash = yield* call([connection, connection.getRecentBlockhash])
  tx.recentBlockhash = blockhash.blockhash
  tx.feePayer = wallet.publicKey
  const signedTx = yield* call([wallet, wallet.signTransaction], tx)
  signedTx.partialSign(...signers)

  yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
    skipPreflight: false
  })
}

export function* handleInitPositionWithSOL(data: InitPositionData): Generator {
  try {
    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const marketProgram = yield* call(getMarketProgram)

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

    const initPositionTx = yield* call([marketProgram, marketProgram.initPositionTx], {
      pair: new Pair(data.tokenX, data.tokenY, {
        fee: data.fee
      }),
      userTokenX,
      userTokenY,
      lowerTick: data.lowerTick,
      upperTick: data.upperTick,
      liquidityDelta: data.liquidityDelta,
      owner: wallet.publicKey
    })

    const tx = new Transaction()
      .add(createIx)
      .add(transferIx)
      .add(initIx)
      .add(initPositionTx)
      .add(unwrapIx)

    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey
    const signedTx = yield* call([wallet, wallet.signTransaction], tx)
    signedTx.partialSign(wrappedSolAccount)
    const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
      skipPreflight: false
    })

    yield put(actions.setInitPositionSuccess(!!txid.length))

    if (!txid.length) {
      yield put(
        snackbarsActions.add({
          message: 'Position adding failed. Please try again.',
          variant: 'error',
          persist: false,
          txid
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Position added successfully.',
          variant: 'success',
          persist: false,
          txid
        })
      )

      yield put(actions.getPositionsList())
    }
  } catch (error) {
    console.log(error)

    yield put(actions.setInitPositionSuccess(false))

    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleInitPosition(action: PayloadAction<InitPositionData>): Generator {
  try {
    if (action.payload.initPool) {
      yield* call(
        createPool,
        action.payload.tokenX,
        action.payload.tokenY,
        action.payload.fee,
        action.payload.initTick
      )
    }

    const allTokens = yield* select(tokens)

    if (
      allTokens[action.payload.tokenX.toString()].address.toString() === WRAPPED_SOL_ADDRESS ||
      allTokens[action.payload.tokenY.toString()].address.toString() === WRAPPED_SOL_ADDRESS
    ) {
      return yield* call(handleInitPositionWithSOL, action.payload)
    }

    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const marketProgram = yield* call(getMarketProgram)

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

    const tx = yield* call([marketProgram, marketProgram.initPositionTx], {
      pair: new Pair(action.payload.tokenX, action.payload.tokenY, { fee: action.payload.fee }),
      userTokenX,
      userTokenY,
      lowerTick: action.payload.lowerTick,
      upperTick: action.payload.upperTick,
      liquidityDelta: action.payload.liquidityDelta,
      owner: wallet.publicKey
    })

    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey
    const signedTx = yield* call([wallet, wallet.signTransaction], tx)

    const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
      skipPreflight: false
    })

    yield put(actions.setInitPositionSuccess(!!txid.length))

    if (!txid.length) {
      yield put(
        snackbarsActions.add({
          message: 'Position adding failed. Please try again.',
          variant: 'error',
          persist: false,
          txid
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Position added successfully.',
          variant: 'success',
          persist: false,
          txid
        })
      )

      yield put(actions.getPositionsList())
    }
  } catch (error) {
    console.log(error)

    yield put(actions.setInitPositionSuccess(false))

    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleGetCurrentPlotTicks(action: PayloadAction<GetCurrentTicksData>): Generator {
  const allPools = yield* select(poolsArraySortedByFees)
  const allTokens = yield* select(tokens)

  const poolIndex = action.payload.poolIndex

  const xDecimal = allTokens[allPools[poolIndex].tokenX.toString()].decimals
  const yDecimal = allTokens[allPools[poolIndex].tokenY.toString()].decimals

  try {
    const marketProgram = yield* call(getMarketProgram)

    const rawTicks = yield* call(
      [marketProgram, marketProgram.getAllTicks],
      new Pair(allPools[poolIndex].tokenX, allPools[poolIndex].tokenY, {
        fee: allPools[poolIndex].fee.v
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
  } catch (error) {
    console.log(error)
    const data = createPlaceholderLiquidityPlot(
      action.payload.isXtoY,
      10,
      allPools[poolIndex].tickSpacing,
      xDecimal,
      yDecimal
    )
    yield put(actions.setPlotTicks(data))
  }
}

export function* handleGetPositionsList() {
  try {
    const marketProgram = yield* call(getMarketProgram)
    const wallet = yield* call(getWallet)

    const { head } = yield* call([marketProgram, marketProgram.getPositionList], wallet.publicKey)

    const list = yield* call(
      [marketProgram, marketProgram.getPositionsFromRange],
      wallet.publicKey,
      0,
      head - 1
    )

    const pools = new Set(list.map(pos => pos.pool.toString()))

    yield* put(poolsActions.getPoolsDataForPositions(Array.from(pools)))

    yield* take(poolsActions.addPoolsForPositions)

    yield* put(actions.setPositionsList(list))
  } catch (error) {
    console.log(error)
    yield* put(actions.setPositionsList([]))
  }
}

export function* handleClaimFeeWithSOL(positionIndex: number) {
  try {
    const connection = yield* call(getConnection)
    const marketProgram = yield* call(getMarketProgram)
    const wallet = yield* call(getWallet)

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
        fee: positionForIndex.fee.v
      }),
      userTokenX,
      userTokenY,
      owner: wallet.publicKey,
      index: positionIndex
    })

    const tx = new Transaction().add(createIx).add(initIx).add(ix).add(unwrapIx)

    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey
    const signedTx = yield* call([wallet, wallet.signTransaction], tx)
    signedTx.partialSign(wrappedSolAccount)

    const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
      skipPreflight: false
    })

    if (!txid.length) {
      yield put(
        snackbarsActions.add({
          message: 'Failed to claim fee. Please try again.',
          variant: 'error',
          persist: false,
          txid
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Fee claimed successfully.',
          variant: 'success',
          persist: false,
          txid
        })
      )
    }

    yield put(actions.getSinglePosition(positionIndex))
  } catch (error) {
    console.log(error)
    yield put(
      snackbarsActions.add({
        message: 'Failed to claim fee. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleClaimFee(action: PayloadAction<number>) {
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

    const connection = yield* call(getConnection)
    const marketProgram = yield* call(getMarketProgram)
    const wallet = yield* call(getWallet)

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
        fee: positionForIndex.fee.v
      }),
      userTokenX,
      userTokenY,
      owner: wallet.publicKey,
      index: action.payload
    })

    const tx = new Transaction().add(ix)

    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey
    const signedTx = yield* call([wallet, wallet.signTransaction], tx)

    const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
      skipPreflight: false
    })

    if (!txid.length) {
      yield put(
        snackbarsActions.add({
          message: 'Failed to claim fee. Please try again.',
          variant: 'error',
          persist: false,
          txid
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Fee claimed successfully.',
          variant: 'success',
          persist: false,
          txid
        })
      )
    }

    yield put(actions.getSinglePosition(action.payload))
  } catch (error) {
    console.log(error)
    yield put(
      snackbarsActions.add({
        message: 'Failed to claim fee. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleClosePositionWithSOL(data: ClosePositionData) {
  try {
    const connection = yield* call(getConnection)
    const marketProgram = yield* call(getMarketProgram)
    const wallet = yield* call(getWallet)

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
        fee: positionForIndex.fee.v
      }),
      owner: wallet.publicKey,
      index: data.positionIndex,
      userTokenX,
      userTokenY
    })

    const tx = new Transaction().add(createIx).add(initIx).add(ix).add(unwrapIx)

    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey
    const signedTx = yield* call([wallet, wallet.signTransaction], tx)
    signedTx.partialSign(wrappedSolAccount)

    const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
      skipPreflight: false
    })

    yield* call(sleep, 3000)

    if (!txid.length) {
      yield put(
        snackbarsActions.add({
          message: 'Failed to close position. Please try again.',
          variant: 'error',
          persist: false,
          txid
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Position closed successfully.',
          variant: 'success',
          persist: false,
          txid
        })
      )
    }

    yield put(actions.getPositionsList())

    data.onSuccess()
  } catch (error) {
    console.log(error)
    yield put(
      snackbarsActions.add({
        message: 'Failed to close position. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleClosePosition(action: PayloadAction<ClosePositionData>) {
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

    const connection = yield* call(getConnection)
    const marketProgram = yield* call(getMarketProgram)
    const wallet = yield* call(getWallet)

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
        fee: positionForIndex.fee.v
      }),
      owner: wallet.publicKey,
      index: action.payload.positionIndex,
      userTokenX,
      userTokenY
    })

    const tx = new Transaction().add(ix)

    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey
    const signedTx = yield* call([wallet, wallet.signTransaction], tx)

    const txid = yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
      skipPreflight: false
    })

    yield* call(sleep, 3000)

    if (!txid.length) {
      yield put(
        snackbarsActions.add({
          message: 'Failed to close position. Please try again.',
          variant: 'error',
          persist: false,
          txid
        })
      )
    } else {
      yield put(
        snackbarsActions.add({
          message: 'Position closed successfully.',
          variant: 'success',
          persist: false,
          txid
        })
      )
    }

    yield put(actions.getPositionsList())

    action.payload.onSuccess()
  } catch (error) {
    console.log(error)
    yield put(
      snackbarsActions.add({
        message: 'Failed to close position. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleGetSinglePosition(action: PayloadAction<number>) {
  try {
    const marketProgram = yield* call(getMarketProgram)
    const wallet = yield* call(getWallet)

    const position = yield* call(
      [marketProgram, marketProgram.getPosition],
      wallet.publicKey,
      action.payload
    )

    yield put(
      actions.setSinglePosition({
        index: action.payload,
        position
      })
    )

    yield put(actions.getCurrentPositionRangeTicks(position.id.toString()))
  } catch (error) {
    console.log(error)
  }
}

export function* handleGetCurrentPositionRangeTicks(action: PayloadAction<string>) {
  try {
    const marketProgram = yield* call(getMarketProgram)

    const positionData = yield* select(singlePositionData(action.payload))

    if (typeof positionData === 'undefined') {
      return
    }

    const pair = new Pair(positionData.poolData.tokenX, positionData.poolData.tokenY, {
      fee: positionData.poolData.fee.v
    })

    const lowerTick = yield* call(
      [marketProgram, marketProgram.getTick],
      pair,
      positionData.lowerTickIndex
    )

    const upperTick = yield* call(
      [marketProgram, marketProgram.getTick],
      pair,
      positionData.upperTickIndex
    )

    yield put(
      actions.setCurrentPositionRangeTicks({
        lowerTick,
        upperTick
      })
    )
  } catch (error) {
    console.log(error)
  }
}

export function* initPositionHandler(): Generator {
  yield* takeEvery(actions.initPosition, handleInitPosition)
}
export function* getCurrentPlotTicksHandler(): Generator {
  yield* takeLatest(actions.getCurrentPlotTicks, handleGetCurrentPlotTicks)
}
export function* getPositionsListHandler(): Generator {
  yield* takeLatest(actions.getPositionsList, handleGetPositionsList)
}
export function* claimFeeHandler(): Generator {
  yield* takeEvery(actions.claimFee, handleClaimFee)
}
export function* closePositionHandler(): Generator {
  yield* takeEvery(actions.closePosition, handleClosePosition)
}
export function* getSinglePositionHandler(): Generator {
  yield* takeEvery(actions.getSinglePosition, handleGetSinglePosition)
}
export function* getCurrentPositionRangeTicksHandler(): Generator {
  yield* takeEvery(actions.getCurrentPositionRangeTicks, handleGetCurrentPositionRangeTicks)
}

export function* positionsSaga(): Generator {
  yield all(
    [
      initPositionHandler,
      getCurrentPlotTicksHandler,
      getPositionsListHandler,
      claimFeeHandler,
      closePositionHandler,
      getSinglePositionHandler,
      getCurrentPositionRangeTicksHandler
    ].map(spawn)
  )
}
