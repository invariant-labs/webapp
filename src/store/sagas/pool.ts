import { call, SagaGenerator, takeLatest, put } from 'typed-redux-saga'
import { getMarketProgram } from '@web3/programs/amm'
import { PublicKey } from '@solana/web3.js'
import { FeeTier, PoolStructure } from '@invariant-labs/sdk/lib/market'
import { Pair } from '@invariant-labs/sdk'
import { actions, TokensPair } from '@reducers/pools'
import { PayloadAction } from '@reduxjs/toolkit'
import { FEE_TIERS } from '@invariant-labs/sdk/src/utils'

// getting pool from SDK: market.get(pair)
export function* fetchPool(tokenX: PublicKey, tokenY: PublicKey, feeTier: FeeTier): SagaGenerator<string> {
  const marketProgram = yield* call(getMarketProgram)

  const result = yield* call(
    [marketProgram, marketProgram.getPool],
    new Pair(
      new PublicKey(tokenX.toBuffer()),
      new PublicKey(tokenY.toBuffer()),
      feeTier
    )
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
  const pair = new Pair(new PublicKey(tokenX.toBuffer()), new PublicKey(tokenY.toBuffer()), FEE_TIERS[0])
  const ticks = yield* call(
    [marketProgram, marketProgram.getInitializedTicksInRange],
    pair,
    from,
    to
  )
  console.log(ticks)
  return ''
}

export function* fetchPoolsData(action: PayloadAction<Pair[]>) {
  const marketProgram = yield* call(getMarketProgram)

  try {
    const pools: PoolStructure[] = []

    for (let i = 0; i < action.payload.length; i++) {
      const poolData = yield* call(
        [marketProgram, marketProgram.getPool],
        action.payload[i]
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
