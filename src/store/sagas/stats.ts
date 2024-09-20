import { actions } from '@reducers/stats'
import { call, put, select, takeEvery } from 'typed-redux-saga'
import { network } from '@selectors/solanaConnection'
import { getFullNewTokensData, getFullSnap } from '@consts/utils'
import { tokens } from '@selectors/pools'
import { PublicKey } from '@solana/web3.js'
import { actions as poolsActions } from '@reducers/pools'
import { getConnection } from './connection'

export function* getStats(): Generator {
  try {
    const connection = yield* call(getConnection)
    const currentNetwork = yield* select(network)

    const fullSnap = yield* call(getFullSnap, currentNetwork.toLowerCase())
    const parsedFullSnap = {
      ...fullSnap,
      tokensData: fullSnap.tokensData.map(token => ({
        ...token,
        address: new PublicKey(token.address)
      })),
      poolsData: fullSnap.poolsData.map(pool => ({
        ...pool,
        poolAddress: new PublicKey(pool.poolAddress),
        tokenX: new PublicKey(pool.tokenX),
        tokenY: new PublicKey(pool.tokenY)
      }))
    }

    yield* put(actions.setCurrentStats(parsedFullSnap))

    const allTokens = yield* select(tokens)

    const unknownTokens = new Set<PublicKey>()

    parsedFullSnap.poolsData.forEach(pool => {
      if (!allTokens[pool.tokenX.toString()]) {
        unknownTokens.add(pool.tokenX)
      }

      if (!allTokens[pool.tokenY.toString()]) {
        unknownTokens.add(pool.tokenY)
      }
    })

    const newTokens = yield* call(getFullNewTokensData, [...unknownTokens], connection)
    yield* put(poolsActions.addTokens(newTokens))
  } catch (error) {
    console.log(error)
  }
}

export function* statsHandler(): Generator {
  yield* takeEvery(actions.getCurrentStats, getStats)
}
