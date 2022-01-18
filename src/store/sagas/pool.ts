import { call, takeLatest, put, select, takeEvery, spawn, all } from 'typed-redux-saga'
import { getMarketProgram } from '@web3/programs/amm'
import { swap } from '@selectors/swap'
import { Pair } from '@invariant-labs/sdk'
import { actions, PoolWithAddress } from '@reducers/pools'
import { PayloadAction } from '@reduxjs/toolkit'
import { Tick } from '@invariant-labs/sdk/src/market'
import { FEE_TIERS } from '@invariant-labs/sdk/src/utils'

// getting pool from SDK: market.get(pair)

export function* fetchPoolsData(action: PayloadAction<Pair[]>) {
  const marketProgram = yield* call(getMarketProgram)

  try {
    const pools: PoolWithAddress[] = []
    for (let i = 0; i < action.payload.length; i++) {
      const poolData = yield* call([marketProgram, marketProgram.getPool], action.payload[i])
      const address = yield* call(
        [action.payload[i], action.payload[i].getAddress],
        marketProgram.program.programId
      )
      pools.push({
        ...poolData,
        address
      })
    }

    yield* put(actions.setPools(pools))
  } catch (error) {
    console.log(error)
  }
}

export function* fetchPoolTicks() {
  const marketProgram = yield* call(getMarketProgram)
  const { simulate } = yield* select(swap)
  try {
    let ticksArray = yield* call(
      [marketProgram, marketProgram.getClosestTicks],
      new Pair(simulate.fromToken, simulate.toToken, FEE_TIERS[0]),
      8,
      undefined,
      'down'
    )
    const ticksArrayUp = yield* call(
      [marketProgram, marketProgram.getClosestTicks],
      new Pair(simulate.fromToken, simulate.toToken, FEE_TIERS[0]),
      8,
      undefined,
      'up'
    )

    yield* put(actions.setTicks(ticksArray.concat(ticksArrayUp)))
    return ticksArray.concat(ticksArrayUp)
  } catch (error) {
    console.log(error)
    return []
  }
}

export function* getPoolsDataHandler(): Generator {
  yield* takeLatest(actions.getPoolsData, fetchPoolsData)
}

export function* ticksHandler(): Generator {
  yield* takeEvery(actions.initPool, fetchPoolTicks)
}

export function* poolsSaga(): Generator {
  yield* all([getPoolsDataHandler, ticksHandler].map(spawn))
}
