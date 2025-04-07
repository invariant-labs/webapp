import { actions } from '@store/reducers/stats'
import { call, put, select, takeLeading } from 'typed-redux-saga'
import { network } from '@store/selectors/solanaConnection'
import { ensureError, getFullSnap } from '@utils/utils'
import { PublicKey } from '@solana/web3.js'
import { handleRpcError } from './connection'
import { lastTimestamp } from '@store/selectors/stats'
import { STATS_CACHE_TIME } from '@store/consts/static'

export function* getStats(): Generator {
  try {
    const lastFetchTimestamp = yield* select(lastTimestamp)

    if (+Date.now() < lastFetchTimestamp + STATS_CACHE_TIME) {
      return yield* put(actions.setLoadingStats(false))
    }

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

    // @ts-expect-error FIXME: Interface missmatch.
    yield* put(actions.setCurrentStats(parsedFullSnap))
  } catch (e: unknown) {
    const error = ensureError(e)
    console.log(error)

    yield* put(actions.setLoadingStats(false))

    yield* call(handleRpcError, error.message)
  }
}

export function* statsHandler(): Generator {
  yield* takeLeading(actions.getCurrentStats, getStats)
}
