import { PublicKey } from '@solana/web3.js'
import { call, SagaGenerator, takeLatest } from 'typed-redux-saga'
import { getMarketProgram } from '@web3/programs/amm'

export function* fetchPositionList(owner: PublicKey) {
  const marketProgram = yield* call(getMarketProgram)

  const positionData = yield* call(
    [marketProgram, marketProgram.getPositionList],
    new PublicKey(owner.toBuffer())
  )

  // action set position list
}

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

export function* getPositionList(): Generator {
  // yield* takeLatest(actions.getPoolsData, fetchPoolsData)
}
