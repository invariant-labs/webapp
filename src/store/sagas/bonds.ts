import { actions } from '@reducers/bonds'
import { all, spawn, takeLatest } from 'typed-redux-saga'

export function* handleGetBondsList(): Generator {}

export function* handleGetUserVested(): Generator {}

export function* handleBuyBondWithWSOL(): Generator {}

export function* handleBuyBond(): Generator {}

export function* handleRedeemBondWithWSOL(): Generator {}

export function* handleRedeemBond(): Generator {}

export function* getBondsListHandler(): Generator {
  yield* takeLatest(actions.getBondsList, handleGetBondsList)
}

export function* getUserVestedHandler(): Generator {
  yield* takeLatest(actions.getUserVested, handleGetUserVested)
}

export function* buyBondHandler(): Generator {
  yield* takeLatest(actions.buyBond, handleBuyBond)
}

export function* redeemBondHandler(): Generator {
  yield* takeLatest(actions.redeemBond, handleRedeemBond)
}

export function* bondsSaga(): Generator {
  yield all(
    [getBondsListHandler, getUserVestedHandler, buyBondHandler, redeemBondHandler].map(spawn)
  )
}
