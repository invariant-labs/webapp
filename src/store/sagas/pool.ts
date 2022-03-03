import { call, takeLatest, put } from 'typed-redux-saga'
import { getMarketProgram } from '@web3/programs/amm'
import { Market, Pair } from '@invariant-labs/sdk'
import { actions, PoolWithAddress } from '@reducers/pools'
import { PayloadAction } from '@reduxjs/toolkit'
import { PoolStructure, Tick } from '@invariant-labs/sdk/src/market'
import { PublicKey } from '@solana/web3.js'

export interface iTick {
  index: Tick[]
}

// TODO: temporary method to fetch multiple pools
const getPools = async (pairs: Pair[], marketProgram: Market): Promise<PoolWithAddress[]> => {
  const addresses: PublicKey[] = await Promise.all(
    pairs.map(async pair => await pair.getAddress(marketProgram.program.programId))
  )

  const pools = (await marketProgram.program.account.pool.fetchMultiple(
    addresses
  )) as PoolStructure[]

  return pools.map((pool, index) => ({
    ...pool,
    address: addresses[index]
  }))
}

export function* fetchPoolsData(action: PayloadAction<Pair[]>) {
  const marketProgram = yield* call(getMarketProgram)
  try {
    const pools: PoolWithAddress[] = yield* call(getPools, action.payload, marketProgram)

    yield* put(actions.setPools(pools))
    yield* put(actions.initPool(true))
  } catch (error) {
    console.log(error)
  }
}

export function* getPoolsDataHandler(): Generator {
  yield* takeLatest(actions.getPoolsData, fetchPoolsData)
}
