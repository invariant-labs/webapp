import { PublicKey } from '@solana/web3.js'
import { call, SagaGenerator, takeLatest } from 'typed-redux-saga'
import { getMarketProgram } from '@web3/programs/amm'
import { Pair } from '@invariant-labs/sdk'

export function* fetchPositionList(owner: PublicKey) {
  const marketProgram = yield* call(getMarketProgram)

  const positionData = yield* call(
    [marketProgram, marketProgram.getPositionList],
    new PublicKey(owner.toBuffer())
  )

  // action set position list
}

export function* fetchPool(pair: Pair): SagaGenerator<string> {
  const marketProgram = yield* call(getMarketProgram)

  const result = yield* call(
    [marketProgram, marketProgram.getPool],
    pair
  )
  console.log(result)
  return ''
}

export function* getPositionList(): Generator {
  // yield* takeLatest(actions.getPoolsData, fetchPoolsData)
}
