import { actions } from '@store/reducers/stats'
import { call, put, select, takeLatest } from 'typed-redux-saga'
import { network } from '@store/selectors/solanaConnection'
import { ensureError, getIntervalsFullSnap } from '@utils/utils'
import { PublicKey } from '@solana/web3.js'
import { lastInterval, lastTimestamp } from '@store/selectors/stats'
import { Intervals, STATS_CACHE_TIME } from '@store/consts/static'
import { PayloadAction } from '@reduxjs/toolkit'
import { handleRpcError } from './connection'

// export function* getStats(): Generator {
//   try {
//     const lastFetchTimestamp = yield* select(lastTimestamp)

//     if (+Date.now() < lastFetchTimestamp + STATS_CACHE_TIME) {
//       return yield* put(actions.setLoadingStats(false))
//     }

//     const currentNetwork = yield* select(network)

//     const fullSnap = yield* call(getFullSnap, currentNetwork.toLowerCase())
//     const parsedFullSnap = {
//       ...fullSnap,
//       tokensData: fullSnap.tokensData.map(token => ({
//         ...token,
//         address: new PublicKey(token.address)
//       })),
//       poolsData: fullSnap.poolsData.map(pool => ({
//         ...pool,
//         poolAddress: new PublicKey(pool.poolAddress),
//         tokenX: new PublicKey(pool.tokenX),
//         tokenY: new PublicKey(pool.tokenY)
//       }))
//     }

//     // @ts-expect-error FIXME: Interface missmatch.
//     yield* put(actions.setCurrentStats(parsedFullSnap))
//   } catch (e: unknown) {
//     const error = ensureError(e)
//     console.log(error)

//     yield* put(actions.setLoadingStats(false))

//     yield* call(handleRpcError, error.message)
//   }
// }

export function* getIntervalStats(action: PayloadAction<{ interval: Intervals }>): Generator {
  try {
    const lastFetchTimestamp = yield* select(lastTimestamp)
    const lastFetchInterval = yield* select(lastInterval)

    if (
      +Date.now() < lastFetchTimestamp + STATS_CACHE_TIME &&
      lastFetchInterval === action.payload.interval
    ) {
      return yield* put(actions.setLoadingStats(false))
    }

    const currentNetwork = yield* select(network)

    const fullSnap = yield* call(
      getIntervalsFullSnap,
      currentNetwork.toLowerCase(),
      action.payload.interval
    )

    const parsedFullSnap = {
      ...fullSnap,
      // @ts-expect-error FIXME: Interface missmatch.
      lastSnapTimestamp: fullSnap.timestamp,
      volumePlot: fullSnap.volumePlot.reverse(),
      liquidityPlot: fullSnap.liquidityPlot.reverse(),
      tokensData: fullSnap.tokensData.map(token => ({
        ...token,
        address: new PublicKey(token.address),
        //@ts-expect-error FIXME: Interface missmatch.
        volume24: token.volume
      })),
      poolsData: fullSnap.poolsData.map(pool => ({
        ...pool,
        poolAddress: new PublicKey(pool.poolAddress),
        tokenX: new PublicKey(pool.tokenX),
        tokenY: new PublicKey(pool.tokenY),
        //@ts-expect-error FIXME: Interface missmatch.
        volume24: pool.volume
      }))
    }

    const payload = {
      ...parsedFullSnap,
      lastInterval: action.payload.interval
    }
    // @ts-expect-error FIXME: Interface missmatch.
    yield* put(actions.setCurrentStats(payload))
  } catch (e: unknown) {
    const error = ensureError(e)
    console.log(error)

    yield* put(actions.setLoadingStats(false))

    yield* call(handleRpcError, error.message)
  }
}

export function* intervalStatsHandler(): Generator {
  yield* takeLatest(actions.getCurrentIntervalStats, getIntervalStats)
}
