import { actions } from '@store/reducers/stats'
import { call, put, select, takeLeading } from 'typed-redux-saga'
import { network } from '@store/selectors/solanaConnection'
import { ensureError, getFullSnap } from '@utils/utils'
import { PublicKey } from '@solana/web3.js'
import { handleRpcError } from './connection'

export function* getStats(): Generator {
  try {
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
  } catch (e) {
    const error = ensureError(e)
    yield* call(handleRpcError, error.message)
    throw error
  }
}

export function* statsHandler(): Generator {
  yield* takeLeading(actions.getCurrentStats, getStats)
}
