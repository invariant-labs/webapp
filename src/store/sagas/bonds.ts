import { BondSaleStruct, BondStruct } from '@invariant-labs/bonds-sdk/lib/sale'
import { actions, RedeemBond, BuyBond } from '@reducers/bonds'
import { getBondsProgram } from '@web3/programs/bonds'
import { all, call, put, select, spawn, takeLatest } from 'typed-redux-saga'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { PayloadAction } from '@reduxjs/toolkit'
import { getFullNewTokensData } from '@consts/utils'
import { tokens } from '@selectors/pools'
import { actions as poolsActions } from '@reducers/pools'
import { getConnection } from './connection'
import { PublicKey } from '@solana/web3.js'

export function* handleGetBondsList() {
  try {
    const connection = yield* call(getConnection)
    const bondsProgram = yield* call(getBondsProgram)

    // const list = yield* call([bondsProgram, bondsProgram.])
    const list: BondSaleStruct[] = []

    const allTokens = yield* select(tokens)

    const unknownTokens = new Set<PublicKey>()

    list.forEach(bond => {
      if (!allTokens[bond.tokenBond.toString()]) {
        unknownTokens.add(bond.tokenBond)
      }

      if (!allTokens[bond.tokenQuote.toString()]) {
        unknownTokens.add(bond.tokenQuote)
      }
    })

    const newTokens = yield* call(getFullNewTokensData, [...unknownTokens], connection)
    yield* put(poolsActions.addTokens(newTokens))

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
