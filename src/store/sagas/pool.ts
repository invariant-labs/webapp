import { call, takeLatest, put, select, all, spawn } from 'typed-redux-saga'
import { getMarketProgram } from '@web3/programs/amm'
import { Pair } from '@invariant-labs/sdk'
import { actions, PoolWithAddress } from '@reducers/pools'
import { PayloadAction } from '@reduxjs/toolkit'
import { PAIRS } from '@consts/static'
import { Tick } from '@invariant-labs/sdk/src/market'
import { network } from '@selectors/solanaConnection'
import { PublicKey } from '@solana/web3.js'
import { PoolStructure } from '@invariant-labs/sdk/lib/market'

export interface iTick {
  index: Tick[]
}

// getting pool from SDK: market.get(pair)

export function* fetchPoolsData(action: PayloadAction<Pair[]>) {
  const marketProgram = yield* call(getMarketProgram)
  const networkType = yield* select(network)
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
    for (let i = 0; i < PAIRS[networkType].length; i++) {
      const ticksArray = yield* call(
        [marketProgram, marketProgram.getAllTicks],
        PAIRS[networkType][i]
      )
      yield* put(actions.setTicks({ index: i, tickStructure: ticksArray }))
    }
    yield* put(actions.initPool(true))
  } catch (error) {
    console.log(error)
  }
}

const fetchPool = async (address: PublicKey) => {
  const marketProgram = await getMarketProgram()

  return (await marketProgram.program.account.pool.fetch(address)) as PoolStructure
}

export function* fetchSinglePoolData(action: PayloadAction<PublicKey>) {
  try {
    const poolData: PoolStructure = yield* call(fetchPool, action.payload)

    yield* put(actions.addPool({
      ...poolData,
      address: action.payload
    }))
  } catch (error) {
    console.log(error)
  }
}

export function* getSinglePoolDataHandler(): Generator {
  yield* takeLatest(actions.getSinglePoolData, fetchSinglePoolData)
}

export function* getPoolsDataHandler(): Generator {
  yield* takeLatest(actions.getPoolsData, fetchPoolsData)
}

export function* poolsSaga(): Generator {
  yield all(
    [
      getPoolsDataHandler,
      getSinglePoolDataHandler
    ].map(spawn)
  )
}
