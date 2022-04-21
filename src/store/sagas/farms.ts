import { all, call, select, spawn, takeLatest } from 'typed-redux-saga'
import { actions, IncentiveWithAddress } from '@reducers/farms'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions as poolsActions } from '@reducers/pools'
import { getConnection } from './connection'
import { getStakerProgram } from '@web3/programs/staker'
import { tokens } from '@selectors/pools'
import { PublicKey } from '@solana/web3.js'

export function* handleGetFarmsList() {
  // try {
  //   const connection = yield* call(getConnection)
  //   const stakerProgram = yield* call(getStakerProgram)

  //   const list = yield* call([stakerProgram, stakerProgram.getAllIncentive])

  //   const allTokens = yield* select(tokens)

  //   const unknownTokens = new Set<PublicKey>()
  //   const farmsObject: Record<string, IncentiveWithAddress> = {}

  //   list.forEach((farm) => {
  //     farmsObject[publicKey.toString()] = {
  //       ...account,
  //       address: publicKey
  //     }
  //     if (!allTokens[account.tokenBond.toString()]) {
  //       unknownTokens.add(account.tokenBond)
  //     }

  //     if (!allTokens[account.tokenQuote.toString()]) {
  //       unknownTokens.add(account.tokenQuote)
  //     }
  //   })

  //   const newTokens = yield* call(getFullNewTokensData, [...unknownTokens], connection)
  //   yield* put(poolsActions.addTokens(newTokens))

  //   yield* put(actions.setBondsList(farmsObject))
  // } catch (error) {
  //   console.log(error)
  // }
}

export function* getFarmsListHandler(): Generator {
  yield* takeLatest(actions.getFarms, handleGetFarmsList)
}

export function* farmsSaga(): Generator {
  yield all([].map(spawn))
}
