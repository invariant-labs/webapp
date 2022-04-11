import { BondSaleStruct, BondStruct } from '@invariant-labs/bonds-sdk/lib/sale'
import { actions, RedeemBond, BuyBond } from '@reducers/bonds'
import { getBondsProgram } from '@web3/programs/bonds'
import { all, call, put, spawn, takeLatest } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { PayloadAction } from '@reduxjs/toolkit'

export function* handleGetBondsList() {
  try {
    const bondsProgram = yield* call(getBondsProgram)

    // const list = yield* call([bondsProgram, bondsProgram.])
    const list: BondSaleStruct[] = []

    yield* put(actions.setBondsList(list))
  } catch (error) {
    console.log(error)
  }
}

export function* handleGetUserVested() {
  try {
    const bondsProgram = yield* call(getBondsProgram)

    // const list = yield* call([bondsProgram, bondsProgram.])
    const list: BondStruct[] = []

    yield* put(actions.setUserVested(list))
  } catch (error) {
    console.log(error)
  }
}

export function* handleBuyBondWithWSOL(data: BuyBond) {
  try {
    const bondsProgram = yield* call(getBondsProgram)
  } catch (error) {
    console.log(error)
  }
}

export function* handleBuyBond(action: PayloadAction<BuyBond>) {
  try {
    const bondsProgram = yield* call(getBondsProgram)
  } catch (error) {
    console.log(error)
  }
}

export function* handleRedeemBondWithWSOL(data: RedeemBond) {
  try {
    const bondsProgram = yield* call(getBondsProgram)
  } catch (error) {
    console.log(error)
  }
}

export function* handleRedeemBond(action: PayloadAction<RedeemBond>) {
  try {
    const bondsProgram = yield* call(getBondsProgram)
  } catch (error) {
    console.log(error)
  }
}

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
