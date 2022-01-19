import { call, put, takeEvery, select, all, spawn, takeLatest } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
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
import { pools, tokens } from '@selectors/pools'
import { Pair, TICK_LIMIT } from '@invariant-labs/sdk'
import {
  calcPrice,
  calcTicksAmountInRange,
  createLiquidityPlot,
  createPlaceholderLiquidityPlot
} from '@consts/utils'
import { accounts } from '@selectors/solanaWallet'
import { Transaction, sendAndConfirmRawTransaction, Keypair, PublicKey } from '@solana/web3.js'
import { positionsWithPoolsData, plotTicks, singlePositionData } from '@selectors/positions'
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { BN } from '@project-serum/anchor'

export function* createPool(
  tokenX: PublicKey,
  tokenY: PublicKey,
  fee: BN,
  initTick?: number
): Generator {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  const marketProgram = yield* call(getMarketProgram)

  const tokenXDetails = new Token(connection, tokenX, TOKEN_PROGRAM_ID, new Keypair())
  const tokenYDetails = new Token(connection, tokenY, TOKEN_PROGRAM_ID, new Keypair())
  const { transaction: tx, signer } = yield* call([marketProgram, marketProgram.createPoolTx], {
    pair: new Pair(tokenX, tokenY, { fee: fee }),
    tokenX: tokenXDetails,
    tokenY: tokenYDetails,
    protocolFee: {
      v: new BN(1000)
    },
    initTick: initTick
  })
  const blockhash = yield* call([connection, connection.getRecentBlockhash])
  tx.recentBlockhash = blockhash.blockhash
  tx.feePayer = wallet.publicKey
  const signedTx = yield* call([wallet, wallet.signTransaction], tx)
  signedTx.partialSign(signer)

  yield* call(sendAndConfirmRawTransaction, connection, signedTx.serialize(), {
    skipPreflight: false
  })
}

export function* handleInitPosition(action: PayloadAction<InitPositionData>): Generator {
  try {
    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const marketProgram = yield* call(getMarketProgram)

    if (action.payload.initPool) {
      yield* call(
        createPool,
        action.payload.tokenX,
        action.payload.tokenY,
        action.payload.fee,
        action.payload.initTick
      )
    }

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
  const allPools = yield* select(pools)
  const allTokens = yield* select(tokens)

  const poolIndex = action.payload.poolIndex

  const xDecimal = allTokens[allPools[poolIndex].tokenX.toString()].decimals
  const yDecimal = allTokens[allPools[poolIndex].tokenY.toString()].decimals

  try {
    const marketProgram = yield* call(getMarketProgram)

    if (typeof action.payload.min !== 'undefined' && typeof action.payload.max !== 'undefined') {
      yield call(sleep, 3000) // cooldown period for case when user spams zooming out to make sure unnecesary requests will be cancelled
    }
    let toRequest =
      typeof action.payload.min !== 'undefined' && typeof action.payload.max !== 'undefined'
        ? calcTicksAmountInRange(
            action.payload.min,
            action.payload.max,
            allPools[poolIndex].tickSpacing,
            action.payload.isXtoY,
            xDecimal,
            yDecimal
          )
        : 30

    if (isNaN(toRequest)) {
      return
    }

    if (toRequest > TICK_LIMIT * 2) {
      const { maxReached } = yield* select(plotTicks)

      if (!maxReached) {
        toRequest = TICK_LIMIT * 2
      } else {
        return
      }
    }

    const rawTicks = yield* call(
      [marketProgram, marketProgram.getClosestTicks],
      new Pair(allPools[poolIndex].tokenX, allPools[poolIndex].tokenY, {
        fee: allPools[poolIndex].fee.v
      }),
      toRequest
    )

    const lowerTickPrice = rawTicks.length
      ? calcPrice(rawTicks[0].index, action.payload.isXtoY, xDecimal, yDecimal)
      : 0

    const upperTickPrice = rawTicks.length
      ? calcPrice(rawTicks[rawTicks.length - 1].index, action.payload.isXtoY, xDecimal, yDecimal)
      : 0

    const ticksData = createLiquidityPlot(
      rawTicks,
      allPools[poolIndex],
      action.payload.isXtoY,
      xDecimal,
      yDecimal
    )

    yield put(
      actions.setPlotTicks({
        data: ticksData,
        maxReached: rawTicks.length < toRequest,
        currentMinPriceFetched: Math.min(lowerTickPrice, upperTickPrice),
        currentMaxPriceFetched: Math.max(lowerTickPrice, upperTickPrice)
      })
    )
  } catch (error) {
    console.log(error)
    if (typeof action.payload.min === 'undefined' && typeof action.payload.max === 'undefined') {
      const data = createPlaceholderLiquidityPlot(
        action.payload.isXtoY,
        10,
        allPools[poolIndex].tickSpacing,
        xDecimal,
        yDecimal
      )
      yield put(
        actions.setPlotTicks({
          data,
          maxReached: true
        })
      )
    }
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

    yield put(actions.setPositionsList(list))
  } catch (error) {
    console.log(error)
    yield put(actions.setPositionsList([]))
  }
}

export function* handleClaimFee(action: PayloadAction<number>) {
  try {
    const connection = yield* call(getConnection)
    const marketProgram = yield* call(getMarketProgram)
    const wallet = yield* call(getWallet)

    const allPositionsData = yield* select(positionsWithPoolsData)
    const tokensAccounts = yield* select(accounts)

    const positionForIndex = allPositionsData[action.payload].poolData

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

export function* handleClosePosition(action: PayloadAction<ClosePositionData>) {
  try {
    const connection = yield* call(getConnection)
    const marketProgram = yield* call(getMarketProgram)
    const wallet = yield* call(getWallet)

    const allPositionsData = yield* select(positionsWithPoolsData)
    const tokensAccounts = yield* select(accounts)

    const positionForIndex = allPositionsData[action.payload.positionIndex].poolData

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
  yield* takeEvery(actions.getPositionsList, handleGetPositionsList)
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
