import { call, put, all, spawn, takeEvery, takeLatest, select } from 'typed-redux-saga'
import { getMarketProgram } from '@web3/programs/amm'
import { Pair } from '@invariant-labs/sdk'
import { actions, PairTokens, PoolWithAddress } from '@reducers/pools'
import { PayloadAction } from '@reduxjs/toolkit'
import { Tick } from '@invariant-labs/sdk/src/market'
import { PublicKey } from '@solana/web3.js'
import { FEE_TIERS } from '@invariant-labs/sdk/lib/utils'
import { getFullNewTokensData, getPools, getPoolsFromAdresses } from '@consts/utils'
import { tokens } from '@selectors/pools'
import { getConnection } from './connection'
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
  const pairs = FEE_TIERS.map(fee => new Pair(action.payload.first, action.payload.second, fee))
  const pools: PoolWithAddress[] = yield call(getPools, pairs, marketProgram)

  yield* put(actions.addPools(pools))
}

export function* fetchPoolsDataForPositions(action: PayloadAction<string[]>) {
  const connection = yield* call(getConnection)
  const marketProgram = yield* call(getMarketProgram)
  const newPools: PoolWithAddress[] = yield* call(
    getPoolsFromAdresses,
    action.payload.map(addr => new PublicKey(addr)),
    marketProgram
  )

  const allTokens = yield* select(tokens)
  const unknownTokens = new Set<PublicKey>()

  newPools.forEach((pool) => {
    if (!allTokens[pool.tokenX.toString()]) {
      unknownTokens.add(pool.tokenX)
    }

    if (!allTokens[pool.tokenY.toString()]) {
      unknownTokens.add(pool.tokenY)
    }
  })

  const newTokens = yield* call(getFullNewTokensData, [...unknownTokens], connection)
  yield* put(actions.addTokens(newTokens))

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
