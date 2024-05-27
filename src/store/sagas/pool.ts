import { call, put, all, spawn, takeEvery, takeLatest, select } from 'typed-redux-saga'
import { getMarketProgram } from '@web3/programs/amm'
import { Pair } from '@invariant-labs/sdk'
import {
  actions,
  JupiterFetchedPool,
  JupiterIndexedPools,
  ListPoolsRequest,
  PairTokens,
  PoolWithAddress
} from '@reducers/pools'
import { PayloadAction } from '@reduxjs/toolkit'
import { Tick } from '@invariant-labs/sdk/src/market'
import { PublicKey } from '@solana/web3.js'
import { FEE_TIERS } from '@invariant-labs/sdk/lib/utils'
import { getFullNewTokensData, getPools, getPoolsFromAdresses } from '@consts/utils'
import { tokens } from '@selectors/pools'
import { getConnection } from './connection'
import { network, rpcAddress } from '@selectors/solanaConnection'

export interface iTick {
  index: Tick[]
}

export function* fetchPoolData(action: PayloadAction<Pair>) {
  const networkType = yield* select(network)
  const rpc = yield* select(rpcAddress)
  const marketProgram = yield* call(getMarketProgram, networkType, rpc)
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
  const networkType = yield* select(network)
  const rpc = yield* select(rpcAddress)
  const marketProgram = yield* call(getMarketProgram, networkType, rpc)
  const pairs = FEE_TIERS.map(fee => new Pair(action.payload.first, action.payload.second, fee))
  const pools: PoolWithAddress[] = yield call(getPools, pairs, marketProgram)

  yield* put(actions.addPools(pools))
}

export function* fetchPoolsDataForList(action: PayloadAction<ListPoolsRequest>) {
  const connection = yield* call(getConnection)
  const networkType = yield* select(network)
  const rpc = yield* select(rpcAddress)
  const marketProgram = yield* call(getMarketProgram, networkType, rpc)
  const newPools: PoolWithAddress[] = yield* call(
    getPoolsFromAdresses,
    action.payload.addresses.map(addr => new PublicKey(addr)),
    marketProgram
  )

  const allTokens = yield* select(tokens)
  const unknownTokens = new Set<PublicKey>()

  newPools.forEach(pool => {
    if (!allTokens[pool.tokenX.toString()]) {
      unknownTokens.add(pool.tokenX)
    }

    if (!allTokens[pool.tokenY.toString()]) {
      unknownTokens.add(pool.tokenY)
    }
  })

  const newTokens = yield* call(getFullNewTokensData, [...unknownTokens], connection)
  yield* put(actions.addTokens(newTokens))

  yield* put(
    actions.addPoolsForList({
      data: newPools,
      listType: action.payload.listType
    })
  )
}

export function* fetchJupiterIndexedPools(): Generator {
  try {
    const response = yield* call(fetch, 'https://cache.jup.ag/markets?v=3')
    const data: JupiterFetchedPool[] = yield* call([response, response.json])
    const indexedPools: JupiterIndexedPools = {}

    data.forEach(pool => {
      indexedPools[pool.pubkey] = true
    })

    yield* put(actions.setJupiterIndexedPools(indexedPools))
  } catch (error) {
    console.log(error)
    yield* put(actions.setErrorJupiterIndexedPools({}))
  }
}

export function* getJupiterIndexedPoolsHandler(): Generator {
  yield* takeLatest(actions.getJupiterIndexedPools, fetchJupiterIndexedPools)
}

export function* getPoolsDataForListHandler(): Generator {
  yield* takeEvery(actions.getPoolsDataForList, fetchPoolsDataForList)
}

export function* getAllPoolsForPairDataHandler(): Generator {
  yield* takeLatest(actions.getAllPoolsForPairData, fetchAllPoolsForPairData)
}

export function* getPoolDataHandler(): Generator {
  yield* takeLatest(actions.getPoolData, fetchPoolData)
}

export function* poolsSaga(): Generator {
  yield all(
    [
      getPoolDataHandler,
      getAllPoolsForPairDataHandler,
      getPoolsDataForListHandler,
      fetchJupiterIndexedPools
    ].map(spawn)
  )
}
