import { call, put, takeEvery, select, all, spawn, takeLatest } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { createAccount, getWallet, sleep } from './wallet'
import { getMarketProgram } from '@web3/programs/amm'
import { getConnection } from './connection'
import { actions, ClosePositionData, GetCurrentTicksData, InitPositionData, PlotTickData } from '@reducers/positions'
import { PayloadAction } from '@reduxjs/toolkit'
import { pools } from '@selectors/pools'
import { calculate_price_sqrt, MAX_TICK, MIN_TICK, Pair, TICK_LIMIT } from '@invariant-labs/sdk'
import { calcTicksAmountInRange, logBase, printBN } from '@consts/utils'
import { PRICE_DECIMAL } from '@consts/static'
import { accounts } from '@selectors/solanaWallet'
import { parseLiquidityOnTicks } from '@invariant-labs/sdk/src/utils'
import { Transaction, Connection } from '@solana/web3.js'
import { positionsWithPoolsData, plotTicks } from '@selectors/positions'

export function* hasTransactionSucceed(connection: Connection, txid: string): Generator {
  while (true) {
    const status = yield* call([connection, connection.getSignatureStatus], txid)

    if (status.value?.confirmationStatus === 'confirmed' || status.value?.confirmationStatus === 'finalized') {
      break
    }

    yield* call(sleep, 500)
  }

  const details = yield* call([connection, connection.getConfirmedTransaction], txid, 'confirmed')

  return !details?.meta?.err || details.meta.err === null
}

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

    console.log(action.payload.lowerTick, action.payload.upperTick, action.payload.liquidityDelta.v.toString())

    const blockhash = yield* call([connection, connection.getRecentBlockhash])
    tx.recentBlockhash = blockhash.blockhash
    tx.feePayer = wallet.publicKey
    const signedTx = yield* call([wallet, wallet.signTransaction], tx)

    const txid = yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
      skipPreflight: true
    })

    const hasSucceed = yield* call(hasTransactionSucceed, connection, txid)

    if (!hasSucceed) {
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
    }
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

export function* handleGetCurrentPlotTicks(action: PayloadAction<GetCurrentTicksData>): Generator {
  try {
    const marketProgram = yield* call(getMarketProgram)
    const allPools = yield* select(pools)

    const poolIndex = action.payload.poolIndex
    let toRequest = typeof action.payload.min !== 'undefined' && typeof action.payload.max !== 'undefined'
      ? calcTicksAmountInRange(
        action.payload.isXtoY ? action.payload.min : 1 / action.payload.max,
        action.payload.isXtoY ? action.payload.max : 1 / action.payload.min,
        allPools[poolIndex].tickSpacing
      )
      : 200

    if (toRequest > TICK_LIMIT * 2) {
      const { data } = yield* select(plotTicks)

      if (data.length < TICK_LIMIT * 2) {
        toRequest = TICK_LIMIT * 2
      } else {
        return
      }
    }

    const rawTicks = yield* call(
      [marketProgram, marketProgram.getClosestTicks],
      new Pair(allPools[poolIndex].tokenX, allPools[poolIndex].tokenY, { fee: allPools[poolIndex].fee.v }),
      toRequest
    )

    const parsedTicks = parseLiquidityOnTicks(rawTicks, allPools[poolIndex])

    const ticks = rawTicks.map((raw, index) => ({
      ...raw,
      liqudity: parsedTicks[index].liquidity
    }))

    const ticksData: PlotTickData[] = []

    ticks.forEach((tick, index) => {
      const sqrt = +printBN(tick.sqrtPrice.v, PRICE_DECIMAL)

      ticksData.push({
        x: action.payload.isXtoY ? sqrt ** 2 : 1 / (sqrt ** 2),
        y: +printBN(tick.liqudity, PRICE_DECIMAL),
        index: tick.index
      })

      if (index < ticks.length - 1 && ticks[index + 1].index - ticks[index].index > allPools[poolIndex].tickSpacing) {
        for (let i = ticks[index].index + allPools[poolIndex].tickSpacing; i < ticks[index + 1].index; i += allPools[poolIndex].tickSpacing) {
          const newSqrtDecimal = calculate_price_sqrt(i)
          const newSqrt = +printBN(newSqrtDecimal.v, PRICE_DECIMAL)

          ticksData.push({
            x: action.payload.isXtoY ? newSqrt ** 2 : 1 / (newSqrt ** 2),
            y: +printBN(tick.liqudity, PRICE_DECIMAL),
            index: i
          })
        }
      }
    })

    if (typeof action.payload.min !== 'undefined' && typeof action.payload.max !== 'undefined' && ticksData.length < toRequest) {
      const minTick = Math.max(MIN_TICK, logBase(action.payload.isXtoY ? action.payload.min : 1 / action.payload.max, 1.0001))

      for (let i = ticks[0].index - allPools[poolIndex].tickSpacing; i >= minTick; i -= allPools[poolIndex].tickSpacing) {
        const newSqrtDecimal = calculate_price_sqrt(i)
        const newSqrt = +printBN(newSqrtDecimal.v, PRICE_DECIMAL)

        ticksData.push({
          x: action.payload.isXtoY ? newSqrt ** 2 : 1 / (newSqrt ** 2),
          y: 0,
          index: i
        })
      }

      const maxTick = Math.min(MAX_TICK, logBase(action.payload.isXtoY ? action.payload.max : 1 / action.payload.min, 1.0001))

      for (let i = ticks[ticks.length - 1].index + allPools[poolIndex].tickSpacing; i < maxTick; i += allPools[poolIndex].tickSpacing) {
        const newSqrtDecimal = calculate_price_sqrt(i)
        const newSqrt = +printBN(newSqrtDecimal.v, PRICE_DECIMAL)

        ticksData.push({
          x: action.payload.isXtoY ? newSqrt ** 2 : 1 / (newSqrt ** 2),
          y: 0,
          index: i
        })
      }
    }

    yield put(actions.setPlotTicks(ticksData.sort((a, b) => a.x - b.x)))
  } catch (error) {
    console.log(error)
    if (typeof action.payload.min === 'undefined' && typeof action.payload.max === 'undefined') {
      yield put(actions.setPlotTicks([]))
    }
  }
}

export function* handleGetPositionsList() {
  try {
    const marketProgram = yield* call(getMarketProgram)
    const wallet = yield* call(getWallet)

    const { head } = yield* call(
      [marketProgram, marketProgram.getPositionList],
      wallet.publicKey
    )

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
      pair: new Pair(
        positionForIndex.tokenX,
        positionForIndex.tokenY,
        { fee: positionForIndex.fee.v }
      ),
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

    yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
      skipPreflight: true
    })

    yield put(
      snackbarsActions.add({
        message: 'Fee claimed successfully.',
        variant: 'success',
        persist: false
      })
    )

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

    const ix = yield* call([marketProgram, marketProgram.removePositionInstruction],
      new Pair(
        positionForIndex.tokenX,
        positionForIndex.tokenY,
        { fee: positionForIndex.fee.v }
      ),
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

    yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
      skipPreflight: true
    })

    yield* call(sleep, 3000)

    yield put(
      snackbarsActions.add({
        message: 'Position closed successfully.',
        variant: 'success',
        persist: false
      })
    )

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

    yield put(actions.setSinglePosition({
      index: action.payload,
      position
    }))
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

export function* positionsSaga(): Generator {
  yield all(
    [initPositionHandler, getCurrentPlotTicksHandler, getPositionsListHandler, claimFeeHandler, closePositionHandler, getSinglePositionHandler].map(spawn)
  )
}
