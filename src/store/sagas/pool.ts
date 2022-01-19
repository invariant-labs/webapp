import { call, takeLatest, put, select, takeEvery, spawn, all } from 'typed-redux-saga'
import { getMarketProgram } from '@web3/programs/amm'
import { Pair } from '@invariant-labs/sdk'
import { actions, PoolWithAddress } from '@reducers/pools'
import { PayloadAction } from '@reduxjs/toolkit'
import { FEE_TIERS } from '@invariant-labs/sdk/src/utils'
import { Tick } from '@invariant-labs/sdk/src/market'

export interface iTick {
  index: Tick[]
}

// getting pool from SDK: market.get(pair)

export function* fetchPoolsData(action: PayloadAction<Pair[]>) {
  const marketProgram = yield* call(getMarketProgram)
  let allTicks = {}
  try {
    const pools: PoolWithAddress[] = []
    let ticks: Tick[] = []
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

    for (let i = 0; i < action.payload.length; i++) {
      const poolData = yield* call([marketProgram, marketProgram.getPool], action.payload[i])
      const ticksArray = yield* call(
        [marketProgram, marketProgram.getClosestTicks],
        new Pair(poolData.tokenX, poolData.tokenY, FEE_TIERS[0]),
        8,
        undefined,
        'down'
      )
      const ticksArrayUp = yield* call(
        [marketProgram, marketProgram.getClosestTicks],
        new Pair(poolData.tokenX, poolData.tokenY, FEE_TIERS[0]),
        8,
        undefined,
        'up'
      )
      ticks = ticksArray.concat(ticksArrayUp)
      yield* put(actions.setTicks({ index: i, tickStructure: ticks }))
    }
    yield* put(actions.initPool(true))
  } catch (error) {
    console.log(error)
  }
}

export function* getPoolsDataHandler(): Generator {
  yield* takeLatest(actions.getPoolsData, fetchPoolsData)
}
