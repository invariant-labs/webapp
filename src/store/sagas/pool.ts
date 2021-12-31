import { call, takeLatest, put } from 'typed-redux-saga'
import { getMarketProgram } from '@web3/programs/amm'

import { Pair } from '@invariant-labs/sdk'
import { actions, PoolWithAddress } from '@reducers/pools'
import { PayloadAction } from '@reduxjs/toolkit'

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

export function* getPoolsDataHandler(): Generator {
  yield* takeLatest(actions.getPoolsData, fetchPoolsData)
}
