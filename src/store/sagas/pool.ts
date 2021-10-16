import { call, SagaGenerator, takeLatest, put } from 'typed-redux-saga'
import { getMarketProgram } from '@web3/programs/amm'
import { PublicKey } from '@solana/web3.js'
import { PoolStructure } from '@invariant-labs/sdk/lib/market'
import { Pair } from '@invariant-labs/sdk'
import { actions, TokensPair } from '@reducers/pools'
import { PayloadAction } from '@reduxjs/toolkit'

// getting pool from SDK: market.get(pair)
export function* fetchPool(tokenX: PublicKey, tokenY: PublicKey): SagaGenerator<string> {
  const marketProgram = yield* call(getMarketProgram)

  const result = yield* call(
    [marketProgram, marketProgram.getPool],
    new PublicKey(tokenX.toBuffer()),
    new PublicKey(tokenY.toBuffer())
  )
  console.log(result)
  return ''
}
export function* fetchTicksForPool(
  tokenX: PublicKey,
  tokenY: PublicKey,
  from: number,
  to: number
): SagaGenerator<string> {
  const marketProgram = yield* call(getMarketProgram)
  const pair = new Pair(new PublicKey(tokenX.toBuffer()), new PublicKey(tokenY.toBuffer()))
  const ticks = yield* call(
    [marketProgram, marketProgram.getInitializedTicksInRange],
    pair,
    from,
    to
  )
  console.log(ticks)
  return ''
}

export function* fetchPoolsData(action: PayloadAction<TokensPair[]>) {
  const marketProgram = yield* call(getMarketProgram)

  try {
    const pools: PoolStructure[] = []

    for (let i = 0; i < action.payload.length; i++) {
      const poolData = yield* call(
        [marketProgram, marketProgram.getPool],
        new PublicKey(action.payload[i].tokenX.toBuffer()),
        new PublicKey(action.payload[i].tokenY.toBuffer())
      )
      pools.push(poolData)
    }

    yield* put(actions.setPools(pools))
  } catch (error) {
    console.log(error)
  }
}

export function* getPoolsDataHandler(): Generator {
  yield* takeLatest(actions.getPoolsData, fetchPoolsData)
}
