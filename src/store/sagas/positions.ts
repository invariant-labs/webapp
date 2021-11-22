import { call, put, takeEvery, select, all, spawn } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { createAccount, getWallet } from './wallet'
import { getMarketProgram } from '@web3/programs/amm'
import { getConnection } from './connection'
import { actions, GetCurrentTicksData, InitPositionData, PlotTickData } from '@reducers/positions'
import { PayloadAction } from '@reduxjs/toolkit'
import { pools } from '@selectors/pools'
import { calculate_price_sqrt, MAX_TICK, MIN_TICK, Pair } from '@invariant-labs/sdk'
import { printBN } from '@consts/utils'
import { PRICE_DECIMAL } from '@consts/static'
import { accounts } from '@selectors/solanaWallet'
import { Tick } from '@invariant-labs/sdk/lib/market'

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

    yield* call([connection, connection.sendRawTransaction], signedTx.serialize(), {
      skipPreflight: true
    })

    yield put(
      snackbarsActions.add({
        message: 'Position added successfully.',
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
export function* handleGetCurrentPlotTicks(action: PayloadAction<GetCurrentTicksData>): Generator {
  try {
    const marketProgram = yield* call(getMarketProgram)
    const allPools = yield* select(pools)

    const poolIndex = action.payload.poolIndex
    const minTick = Math.max(allPools[poolIndex].currentTickIndex - (100 * allPools[poolIndex].tickSpacing), MIN_TICK)
    const maxTick = Math.min(allPools[poolIndex].currentTickIndex + (100 * allPools[poolIndex].tickSpacing), MAX_TICK)

    const ticks = yield* call(
      [marketProgram, marketProgram.getInitializedTicksInRange],
      new Pair(allPools[poolIndex].tokenX, allPools[poolIndex].tokenY, { fee: allPools[poolIndex].fee.v }),
      minTick,
      maxTick
    )

    let ticksData: PlotTickData[]

    if (ticks.length === 201) {
      let currentLiquidity = 0
      ticksData = ticks.map((tick) => {
        const sqrt = +printBN(tick.sqrtPrice.v, PRICE_DECIMAL)

        currentLiquidity += +printBN(tick.liquidityChange.v, PRICE_DECIMAL)

        return {
          x: action.payload.isXtoY ? sqrt ** sqrt : 1 / (sqrt ** sqrt),
          y: currentLiquidity,
          index: tick.index
        }
      }).sort((a, b) => a.x - b.x)
    } else {
      ticksData = []

      for (let i = minTick; i <= maxTick; i += allPools[poolIndex].tickSpacing) {
        const sqrtDecimal = calculate_price_sqrt(i)
        const sqrt = +printBN(sqrtDecimal.v, PRICE_DECIMAL)

        ticksData.push({
          x: action.payload.isXtoY ? sqrt ** sqrt : 1 / (sqrt ** sqrt),
          y: 0,
          index: i
        })
      }

      const ticksObj: { [key: string]: Tick } = {}
      ticks.forEach((tick) => {
        ticksObj[tick.index.toString()] = tick
      })

      let currentLiquidity = 0
      ticksData = ticksData.map((data) => {
        if (ticksObj[data.index.toString()]) {
          currentLiquidity += +printBN(ticksObj[data.index.toString()].liquidityChange.v, PRICE_DECIMAL)
        }

        return {
          ...data,
          y: currentLiquidity
        }
      }).sort((a, b) => a.x - b.x)
    }

    yield put(actions.setPlotTicks(ticksData))
  } catch (error) {
    console.log(error)
    yield put(actions.setPlotTicks([]))
  }
}

export function* initPositionHandler(): Generator {
  yield* takeEvery(actions.initPosition, handleInitPosition)
}
export function* getCurrentPlotTicksHandler(): Generator {
  yield* takeEvery(actions.getCurrentPlotTicks, handleGetCurrentPlotTicks)
}

export function* positionsSaga(): Generator {
  yield all(
    [initPositionHandler, getCurrentPlotTicksHandler].map(spawn)
  )
}
