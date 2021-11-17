import { call, put, takeEvery, select, all, spawn } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { getWallet } from './wallet'
import { getMarketProgram } from '@web3/programs/amm'
import { getConnection } from './connection'
import { actions } from '@reducers/positions'
import { Transaction } from '@solana/web3.js'
import { PayloadAction } from '@reduxjs/toolkit'
import { InitPosition } from '@invariant-labs/sdk/lib/market'
import { pools } from '@selectors/pools'
import { MAX_TICK, MIN_TICK, Pair } from '@invariant-labs/sdk'
import { printBN } from '@consts/utils'
import { PRICE_DECIMAL } from '@consts/static'

export function* handleInitPosition(action: PayloadAction<Omit<InitPosition, 'owner'>>): Generator {
  try {
    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const marketProgram = yield* call(getMarketProgram)
    const initPositionIx = yield* call([marketProgram, marketProgram.initPositionInstruction], {
      ...action.payload,
      owner: wallet.publicKey
    })
    const tx = new Transaction().add(initPositionIx)
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
export function* handleGetCurrentPlotTicks(action: PayloadAction<{ poolIndex: number }>): Generator {
  try {
    const marketProgram = yield* call(getMarketProgram)
    const allPools = yield* select(pools)
    const poolIndex = action.payload.poolIndex
    const ticks = yield* call(
      [marketProgram, marketProgram.getInitializedTicksInRange],
      new Pair(allPools[poolIndex].tokenX, allPools[poolIndex].tokenY, { fee: allPools[poolIndex].fee.v }),
      Math.max(allPools[poolIndex].currentTickIndex - (100 * allPools[poolIndex].tickSpacing), MIN_TICK),
      Math.min(allPools[poolIndex].currentTickIndex + (100 * allPools[poolIndex].tickSpacing), MAX_TICK)
    )

    let currentLiquidity = 0
    const ticksData = ticks.map((tick) => {
      const sqrt = +printBN(tick.sqrtPrice.v, PRICE_DECIMAL)

      currentLiquidity += +printBN(tick.liquidityChange.v, PRICE_DECIMAL)

      return {
        x: sqrt ** sqrt,
        y: currentLiquidity,
        index: tick.index
      }
    }).sort((a, b) => a.index - b.index)
    yield put(actions.setPlotTicks(ticksData))
  } catch (error) {
    console.log(error)
    yield put(actions.plotTicksFail())
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
