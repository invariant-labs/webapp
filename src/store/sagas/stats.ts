import { actions, PoolStatsData, TimeData, TokenStatsData } from '@reducers/stats'
import { call, put, select, takeEvery } from 'typed-redux-saga'
import { network } from '@selectors/solanaConnection'
import { getCoingeckoPricesData, getCoingeckoPricesHistory, getNetworkStats, getPoolsFromAdresses, PoolSnapshot, printBN } from '@consts/utils'
import { tokens } from '@selectors/pools'
import { PublicKey } from '@solana/web3.js'
import { getMarketProgram } from '@web3/programs/amm'
import { PoolWithAddress } from '@reducers/pools'
import { Token } from '@consts/static'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'

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
    const coingeckoPricesHistory = yield* call(getCoingeckoPricesHistory)

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

    const tokensDataObject: Record<string, TokenStatsData> = {}
    const poolsData: PoolStatsData[] = []

    const volumePlot: TimeData[] = []
    const liquidityPlot: TimeData[] = []

    let prevVolume24 = 0
    let prevTvl24 = 0
    let prevFees24 = 0

    Object.entries(existingPoolsData).forEach(([address, snapshots]) => {
      if (!tokensDataObject[poolsDataObject[address].tokenX.toString()]) {
        tokensDataObject[poolsDataObject[address].tokenX.toString()] = {
          address: poolsDataObject[address].tokenX,
          price: 0,
          priceChange: 0,
          volume24: 0,
          tvl: 0
        }
      }

      if (!tokensDataObject[poolsDataObject[address].tokenY.toString()]) {
        tokensDataObject[poolsDataObject[address].tokenY.toString()] = {
          address: poolsDataObject[address].tokenY,
          price: 0,
          priceChange: 0,
          volume24: 0,
          tvl: 0
        }
      }

      if (!snapshots.length) {
        poolsData.push({
          volume24: 0,
          tvl: 0,
          tokenX: poolsDataObject[address].tokenX,
          tokenY: poolsDataObject[address].tokenY,
          fee: +printBN(poolsDataObject[address].fee.v, DECIMAL - 2)
        })
        return
      }

      const tokenX = allTokens[poolsDataObject[address].tokenX.toString()]
      const tokenY = allTokens[poolsDataObject[address].tokenY.toString()]

      const lastSnapshot = snapshots[snapshots.length - 1]

      if (snapshots.length > 1) {
        const secondLastSnapshot = snapshots[snapshots.length - 2]

        if (snapshots.length > 2) {
          const thirdLastSnapshot = snapshots[snapshots.length - 3]
        }
      }

      volume24.value += 0
      fees24.value += 0
      tvl24.value += 0

      prevVolume24 += 0
      prevFees24 += 0
      prevTvl24 += 0
    })

    volume24.change = (volume24.value - prevVolume24) / prevVolume24 * 100
    tvl24.change = (tvl24.value - prevTvl24) / prevTvl24 * 100
    fees24.change = (fees24.value - prevFees24) / prevFees24 * 100

    yield* put(actions.setCurrentStats({
      volume24,
      tvl24,
      fees24,
      tokensData: Object.values(tokensDataObject),
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
