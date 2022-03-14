import { call, put, all, spawn, takeEvery, takeLatest } from 'typed-redux-saga'
import { getMarketProgram } from '@web3/programs/amm'
import { Pair } from '@invariant-labs/sdk'
import { actions, PairTokens, PoolWithAddress } from '@reducers/pools'
import { PayloadAction } from '@reduxjs/toolkit'
import { Tick } from '@invariant-labs/sdk/src/market'
import { PublicKey } from '@solana/web3.js'
import { Market, PoolStructure } from '@invariant-labs/sdk/lib/market'
import { FEE_TIERS } from '@invariant-labs/sdk/lib/utils'
export interface iTick {
  index: Tick[]
}

// TODO: temporary method to fetch multiple pools
export const getPools = async (
  pairs: Pair[],
  marketProgram: Market
): Promise<PoolWithAddress[]> => {
  const addresses: PublicKey[] = await Promise.all(
    pairs.map(async pair => await pair.getAddress(marketProgram.program.programId))
  )

  const pools = (await marketProgram.program.account.pool.fetchMultiple(
    addresses
  )) as Array<PoolStructure | null>

  return pools
    .map((pool, index) =>
      pool !== null
        ? {
            ...pool,
            address: addresses[index]
          }
        : null
    )
    .filter(pool => pool !== null) as PoolWithAddress[]
}

export function* fetchPoolData(action: PayloadAction<Pair>) {
  const marketProgram = yield* call(getMarketProgram)
  try {
    const poolData = yield* call([marketProgram, marketProgram.getPool], action.payload)
    const address = yield* call(
      [action.payload, action.payload.getAddress],
      marketProgram.program.programId
    )

    yield* put(
      actions.addPools([
        {
          ...poolData,
          address
        }
      ])
    )
  } catch (error) {
    yield* put(actions.addPools([]))
  }
}

export function* fetchAllPoolsForPairData(action: PayloadAction<PairTokens>) {
  const marketProgram = yield* call(getMarketProgram)
  const pairs = FEE_TIERS.map(fee => new Pair(action.payload.first, action.payload.second, fee))
  const pools: PoolWithAddress[] = yield call(getPools, pairs, marketProgram)

  yield* put(actions.addPools(pools))
}

export const getPoolsFromAdresses = async (
  addresses: PublicKey[],
  marketProgram: Market
): Promise<PoolWithAddress[]> => {
  const pools = (await marketProgram.program.account.pool.fetchMultiple(
    addresses
  )) as PoolStructure[]

  return pools.map((pool, index) => ({
    ...pool,
    address: addresses[index]
  }))
}

export function* fetchPoolsDataForPositions(action: PayloadAction<string[]>) {
  const marketProgram = yield* call(getMarketProgram)
  const newPools: PoolWithAddress[] = yield* call(
    getPoolsFromAdresses,
    action.payload.map(addr => new PublicKey(addr)),
    marketProgram
  )

  yield* put(actions.addPoolsForPositions(newPools))
}

export function* getPoolsDataForPositionsHandler(): Generator {
  yield* takeEvery(actions.getPoolsDataForPositions, fetchPoolsDataForPositions)
}

export function* getAllPoolsForPairDataHandler(): Generator {
  yield* takeLatest(actions.getAllPoolsForPairData, fetchAllPoolsForPairData)
}

export function* getPoolDataHandler(): Generator {
  yield* takeLatest(actions.getPoolData, fetchPoolData)
}

export function* poolsSaga(): Generator {
  yield all(
    [getPoolDataHandler, getAllPoolsForPairDataHandler, getPoolsDataForPositionsHandler].map(spawn)
  )
}
