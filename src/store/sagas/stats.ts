import { actions } from '@store/reducers/stats'
import { call, put, select, takeEvery } from 'typed-redux-saga'
import { network } from '@store/selectors/solanaConnection'
import { getFullNewTokensData, getFullSnap } from '@utils/utils'
import { tokens } from '@store/selectors/pools'
import { PublicKey } from '@solana/web3.js'
import { actions as poolsActions } from '@store/reducers/pools'
import { getConnection, handleRpcError } from './connection'

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
    yield* call(handleRpcError, (error as Error).message)
    throw error
  }
}

export function* statsHandler(): Generator {
  yield* takeEvery(actions.getCurrentStats, getStats)
}
