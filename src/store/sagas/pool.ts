import { call, put, all, spawn, takeEvery, takeLatest } from 'typed-redux-saga'
import { getMarketProgram } from '@web3/programs/amm'
import { Pair } from '@invariant-labs/sdk'
import { actions, PairTokens, PoolWithAddress } from '@reducers/pools'
import { PayloadAction } from '@reduxjs/toolkit'
import { Tick } from '@invariant-labs/sdk/src/market'
import { PublicKey } from '@solana/web3.js'
import { PoolStructure } from '@invariant-labs/sdk/lib/market'
import { FEE_TIERS } from '@invariant-labs/sdk/lib/utils'
export interface iTick {
  index: Tick[]
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
  const pools: PoolWithAddress[] = []
  for (const fee of FEE_TIERS) {
    try {
      const pair = new Pair(action.payload.first, action.payload.second, fee)
      const poolData = yield* call([marketProgram, marketProgram.getPool], pair)
      const address = yield* call([pair, pair.getAddress], marketProgram.program.programId)

      pools.push({
        ...poolData,
        address
      })
    } catch (error) {}
  }

  yield* put(actions.addPools(pools))
}

const fetchPoolFromAddress = async (address: PublicKey) => {
  const marketProgram = await getMarketProgram()

  return (await marketProgram.program.account.pool.fetch(address)) as PoolStructure
}

export function* fetchPoolsDataForPositions(action: PayloadAction<string[]>) {
  const newPools: PoolWithAddress[] = []

  for (const address of action.payload) {
    try {
      const poolData: PoolStructure = yield* call(fetchPoolFromAddress, new PublicKey(address))

      newPools.push({
        ...poolData,
        address: new PublicKey(address)
      })
    } catch (error) {}
  }

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
