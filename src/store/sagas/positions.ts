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
import { pools } from '@selectors/pools'
import { Pair, TICK_LIMIT } from '@invariant-labs/sdk'
import {
  calcPrice,
  calcTicksAmountInRange,
  createLiquidityPlot,
  createPlaceholderLiquidityPlot
} from '@consts/utils'
import { accounts } from '@selectors/solanaWallet'
import { Transaction, sendAndConfirmRawTransaction } from '@solana/web3.js'
import { positionsWithPoolsData, plotTicks, singlePositionData } from '@selectors/positions'
import { network } from '@selectors/solanaConnection'
import { tokens } from '@consts/static'

export function* handleInitPosition(action: PayloadAction<InitPositionData>): Generator {
  try {
    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const marketProgram = yield* call(getMarketProgram)

    const allPools = yield* select(pools)
    const tokensAccounts = yield* select(accounts)

    let userTokenX = tokensAccounts[allPools[action.payload.poolIndex].tokenX.toString()]
      ? tokensAccounts[allPools[action.payload.poolIndex].tokenX.toString()].address
      : null

    if (userTokenX === null) {
      userTokenX = yield* call(createAccount, allPools[action.payload.poolIndex].tokenX)
    }

    let userTokenY = tokensAccounts[allPools[action.payload.poolIndex].tokenY.toString()]
      ? tokensAccounts[allPools[action.payload.poolIndex].tokenY.toString()].address
      : null

    if (userTokenY === null) {
      userTokenY = yield* call(createAccount, allPools[action.payload.poolIndex].tokenY)
    }

    const tx = yield* call([marketProgram, marketProgram.initPositionTx], {
      pair: new Pair(
        allPools[action.payload.poolIndex].tokenX,
        allPools[action.payload.poolIndex].tokenY,
        { fee: allPools[action.payload.poolIndex].fee.v }
      ),
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
  const networkType = yield* select(network)

  try {
    const marketProgram = yield* call(getMarketProgram)

    const poolIndex = action.payload.poolIndex

    if (typeof action.payload.min === 'undefined' && typeof action.payload.max === 'undefined') {
      const plot = createPlaceholderLiquidityPlot(
        allPools[poolIndex],
        action.payload.isXtoY,
        10,
        networkType
      )
      yield put(actions.setPlotTicksLoading(plot))
    }
    let toRequest =
      typeof action.payload.min !== 'undefined' && typeof action.payload.max !== 'undefined'
        ? calcTicksAmountInRange(
            action.payload.min,
            action.payload.max,
            allPools[poolIndex].tickSpacing,
            action.payload.isXtoY,
            tokens[networkType].find(token => token.address.equals(allPools[poolIndex].tokenX))
              ?.decimal ?? 0,
            tokens[networkType].find(token => token.address.equals(allPools[poolIndex].tokenY))
              ?.decimal ?? 0
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
      ? calcPrice(
          rawTicks[0].index,
          action.payload.isXtoY,
          tokens[networkType].find(token => token.address.equals(allPools[poolIndex].tokenX))
            ?.decimal ?? 0,
          tokens[networkType].find(token => token.address.equals(allPools[poolIndex].tokenY))
            ?.decimal ?? 0
        )
      : 0

    const upperTickPrice = rawTicks.length
      ? calcPrice(
          rawTicks[rawTicks.length - 1].index,
          action.payload.isXtoY,
          tokens[networkType].find(token => token.address.equals(allPools[poolIndex].tokenX))
            ?.decimal ?? 0,
          tokens[networkType].find(token => token.address.equals(allPools[poolIndex].tokenY))
            ?.decimal ?? 0
        )
      : 0

    const ticksData = createLiquidityPlot(
      rawTicks,
      allPools[poolIndex],
      action.payload.isXtoY,
      networkType
    )

    yield put(
      actions.setPlotTicks({
        data: ticksData,
        maxReached: rawTicks.length < toRequest,
        minPriceFetch: Math.min(lowerTickPrice, upperTickPrice),
        maxPriceFetch: Math.max(lowerTickPrice, upperTickPrice)
      })
    )
  } catch (error) {
    console.log(error)
    if (typeof action.payload.min === 'undefined' && typeof action.payload.max === 'undefined') {
      const data = createPlaceholderLiquidityPlot(
        allPools[action.payload.poolIndex],
        action.payload.isXtoY,
        10,
        networkType
      )
      yield put(
        actions.setPlotTicks({
          data,
          maxReached: false
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

    const ix = yield* call(
      [marketProgram, marketProgram.removePositionInstruction],
      new Pair(positionForIndex.tokenX, positionForIndex.tokenY, { fee: positionForIndex.fee.v }),
      wallet.publicKey,
      action.payload.positionIndex,
      userTokenX,
      userTokenY
    )

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
