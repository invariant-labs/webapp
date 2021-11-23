import { call, put, takeEvery, all, spawn } from 'typed-redux-saga'
import { getWallet } from './wallet'
import { getMarketProgram } from '@web3/programs/amm'
import { actions } from '@reducers/positions'

export function* handleGetPositionsList() {
  try {
    const marketProgram = yield* call(getMarketProgram)
    const wallet = yield* call(getWallet)

    const { head } = yield* call(
      [marketProgram, marketProgram.getPositionList],
      wallet.publicKey
    )

    const list = yield* call(
      [marketProgram, marketProgram.getPositionsFromRange],
      wallet.publicKey,
      0,
      head - 1
    )

    yield put(actions.setPositionsList(list))
  } catch (error) {
    console.log(error)
    yield put(actions.setPositionsList([]))
  }
}

export function* getPositionsListHandler(): Generator {
  yield* takeEvery(actions.getPositionsList, handleGetPositionsList)
}

export function* positionsSaga(): Generator {
  yield all(
    [getPositionsListHandler].map(spawn)
  )
}
