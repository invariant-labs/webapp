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

export function* fetchPoolTicks(action: PayloadAction<boolean>) {
  const marketProgram = yield* call(getMarketProgram)
  console.log(123)
  const { simulate } = yield* select(swap)
  try {
    const ticksArray = yield* call(
      [marketProgram, marketProgram.getClosestTicks],
      new Pair(simulate.fromToken, simulate.toToken, FEE_TIERS[0]),
      Infinity,
      undefined,
      'down'
    )
    yield* put(actions.setTicks(ticksArray))
  } catch (error) {
    console.log('error !!')
    console.log(error)
  }
}

export function* getPoolsDataHandler(): Generator {
  yield* takeLatest(actions.getPoolsData, fetchPoolsData)
}

export function* ticksHandler(): Generator {
  yield* takeLatest(actions.initPool, fetchPoolTicks)
}

export function* poolSaga(): Generator {
  yield all([fetchPoolsData, fetchPoolTicks].map(spawn))
}
