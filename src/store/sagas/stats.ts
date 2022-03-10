import { actions, PoolStatsData, TimeData, TokenStatsData } from '@reducers/stats'
import { call, put, select, takeEvery } from 'typed-redux-saga'
import { network } from '@selectors/solanaConnection'
import { CoingeckoPriceData, getCoingeckoPricesData, getNetworkStats, getPoolsFromAdresses, PoolSnapshot } from '@consts/utils'
import { tokens } from '@selectors/pools'
import { PublicKey } from '@solana/web3.js'
import { getMarketProgram } from '@web3/programs/amm'
import { PoolWithAddress } from '@reducers/pools'
import { Token } from '@consts/static'

export type CoingeckoTokenWithPrice = Required<Token> & CoingeckoPriceData

export function* getStats(): Generator {
  try {
    const currentNetwork = yield* select(network)
    const data = yield* call(getNetworkStats, currentNetwork.toLowerCase())

    const marketProgram = yield* call(getMarketProgram)

    const allPoolsData = yield* call(
      getPoolsFromAdresses,
      Object.keys(data).map(addr => new PublicKey(addr)),
      marketProgram
    )
    const poolsDataObject: Record<string, PoolWithAddress> = allPoolsData.reduce(
      (acc, pool) => ({
        ...acc,
        [pool.address.toString()]: pool
      }),
      {}
    )

    const existingPoolsData: Record<string, PoolSnapshot[]> = Object.entries(data).reduce(
      (acc, [key, val]) =>
        typeof poolsDataObject[key] !== 'undefined'
          ? {
              ...acc,
              [key]: val
            }
          : acc,
      {}
    )

    const allTokens = yield* select(tokens)
    const coingeckoTokens: Record<string, Required<Token>> = Object.entries(allTokens).reduce((acc, [key, val]) => typeof val.coingeckoId !== 'undefined' ? ({
      ...acc,
      [key]: val
    }) : acc, {})
    const coingeckoPricesData = yield* call(getCoingeckoPricesData, Object.values(coingeckoTokens).map(token => token.coingeckoId))
    const coingeckoTokensWithPrice: Record<string, CoingeckoTokenWithPrice> = Object.entries(coingeckoTokens).reduce((acc, [key, val], index) => ({
      ...acc,
      [key]: {
        ...val,
        ...coingeckoPricesData[index]
      }
    }), {})

    const volume24 = {
      value: 0,
      change: 0
    }
    const tvl24 = {
      value: 0,
      change: 0
    }
    const fees24 = {
      value: 0,
      change: 0
    }

    let prevVolume24 = 0
    let prevTvl24 = 0
    let prevFees24 = 0

    Object.entries(existingPoolsData).forEach(([address, snapshots]) => {
      if (!snapshots.length) {
        return
      }

      const xPrice = coingeckoTokensWithPrice[poolsDataObject[address].tokenX.toString()].price
      const yPrice = coingeckoTokensWithPrice[poolsDataObject[address].tokenY.toString()].price

      const xDecimal = coingeckoTokensWithPrice[poolsDataObject[address].tokenX.toString()].decimals
      const yDecimal = coingeckoTokensWithPrice[poolsDataObject[address].tokenY.toString()].decimals

      const lastSnapshot = snapshots[snapshots.length - 1]

      volume24.value += (+lastSnapshot.volumeX / 10 ** xDecimal * xPrice) + (+lastSnapshot.volumeY / 10 ** yDecimal * yPrice)
      fees24.value += (+lastSnapshot.feeX / 10 ** xDecimal * xPrice) + (+lastSnapshot.feeY / 10 ** yDecimal * yPrice)

      if (snapshots.length > 1) {
        const secondLastSnapshot = snapshots[snapshots.length - 2]

        volume24.value -= (+secondLastSnapshot.volumeX / 10 ** xDecimal * xPrice) + (+secondLastSnapshot.volumeY / 10 ** yDecimal * yPrice)
        fees24.value -= (+secondLastSnapshot.feeX / 10 ** xDecimal * xPrice) + (+secondLastSnapshot.feeY / 10 ** yDecimal * yPrice)

        prevVolume24 += (+secondLastSnapshot.volumeX / 10 ** xDecimal * xPrice) + (+secondLastSnapshot.volumeY / 10 ** yDecimal * yPrice)
        prevFees24 += (+secondLastSnapshot.feeX / 10 ** xDecimal * xPrice) + (+secondLastSnapshot.feeY / 10 ** yDecimal * yPrice)

        if (snapshots.length > 2) {
          const thirdLastSnapshot = snapshots[snapshots.length - 3]

          prevVolume24 -= (+thirdLastSnapshot.volumeX / 10 ** xDecimal * xPrice) + (+thirdLastSnapshot.volumeY / 10 ** yDecimal * yPrice)
          prevFees24 -= (+thirdLastSnapshot.feeX / 10 ** xDecimal * xPrice) + (+thirdLastSnapshot.feeY / 10 ** yDecimal * yPrice)
        }

        prevTvl24 += (+secondLastSnapshot.liquidityX / 10 ** xDecimal * xPrice) + (+secondLastSnapshot.liquidityY / 10 ** yDecimal * yPrice)
      }

      tvl24.value += (+lastSnapshot.liquidityX / 10 ** xDecimal * xPrice) + (+lastSnapshot.liquidityY / 10 ** yDecimal * yPrice)
    })

    volume24.change = (volume24.value - prevVolume24) / prevVolume24 * 100
    tvl24.change = (tvl24.value - prevTvl24) / prevTvl24 * 100
    fees24.change = (fees24.value - prevFees24) / prevFees24 * 100

    const tokensData: TokenStatsData[] = []
    const poolsData: PoolStatsData[] = []

    const volumePlot: TimeData[] = []
    const liquidityPlot: TimeData[] = []

    yield* put(actions.setCurrentStats({
      volume24,
      tvl24,
      fees24,
      tokensData,
      poolsData,
      volumePlot,
      liquidityPlot
    }))
  } catch (error) {
    console.log(error)
  }
}

export function* statsHandler(): Generator {
  yield* takeEvery(actions.getCurrentStats, getStats)
}
