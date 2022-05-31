import { actions, PoolStatsData, TimeData, TokenStatsData } from '@reducers/stats'
import { call, put, select, takeEvery } from 'typed-redux-saga'
import { network } from '@selectors/solanaConnection'
import {
  getCoingeckoPricesData,
  getFullNewTokensData,
  getNetworkStats,
  getPoolsAPY,
  getPoolsFromAdresses,
  printBN
} from '@consts/utils'
import { tokens } from '@selectors/pools'
import { PublicKey } from '@solana/web3.js'
import { getMarketProgram } from '@web3/programs/amm'
import { PoolWithAddress, actions as poolsActions } from '@reducers/pools'
import { Token } from '@consts/static'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'
import { getConnection } from './connection'

export function* getStats(): Generator {
  try {
    const connection = yield* call(getConnection)
    const currentNetwork = yield* select(network)
    const data = yield* call(getNetworkStats, currentNetwork.toLowerCase())
    const poolsApy = yield* call(getPoolsAPY, currentNetwork.toLowerCase())

    const marketProgram = yield* call(getMarketProgram)

    const allPoolsData = yield* call(
      getPoolsFromAdresses,
      Object.keys(data).map(addr => new PublicKey(addr)),
      marketProgram
    )
    const poolsDataObject: Record<string, PoolWithAddress> = {}
    allPoolsData.forEach(pool => {
      poolsDataObject[pool.address.toString()] = pool
    })

    let allTokens = yield* select(tokens)

    const unknownTokens = new Set<PublicKey>()

    allPoolsData.forEach(pool => {
      if (!allTokens[pool.tokenX.toString()]) {
        unknownTokens.add(pool.tokenX)
      }

      if (!allTokens[pool.tokenY.toString()]) {
        unknownTokens.add(pool.tokenY)
      }
    })

    const newTokens = yield* call(getFullNewTokensData, [...unknownTokens], connection)
    yield* put(poolsActions.addTokens(newTokens))
    allTokens = yield* select(tokens)

    const coingeckoTokens: Record<string, Required<Token>> = {}
    Object.entries(allTokens).forEach(([key, val]) => {
      if (typeof val.coingeckoId !== 'undefined') {
        coingeckoTokens[key] = val as Required<Token>
      }
    })
    const coingeckoPricesData = yield* call(
      getCoingeckoPricesData,
      Object.values(coingeckoTokens).map(token => token.coingeckoId)
    )

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

    const volumeForTimestamps: Record<string, number> = {}
    const liquidityForTimestamps: Record<string, number> = {}

    let prevVolume24 = 0
    let prevTvl24 = 0
    let prevFees24 = 0

    Object.entries(data).forEach(([address, snapshots]) => {
      if (!poolsDataObject[address]) {
        return
      }

      const coingeckoXId =
        coingeckoTokens?.[poolsDataObject[address].tokenX.toString()]?.coingeckoId ?? ''
      const coingeckoYId =
        coingeckoTokens?.[poolsDataObject[address].tokenY.toString()]?.coingeckoId ?? ''

      if (!tokensDataObject[poolsDataObject[address].tokenX.toString()]) {
        tokensDataObject[poolsDataObject[address].tokenX.toString()] = {
          address: poolsDataObject[address].tokenX,
          price: coingeckoPricesData?.[coingeckoXId]?.price ?? 0,
          priceChange: coingeckoPricesData?.[coingeckoXId]?.priceChange ?? 0,
          volume24: 0,
          tvl: 0
        }
      }

      if (!tokensDataObject[poolsDataObject[address].tokenY.toString()]) {
        tokensDataObject[poolsDataObject[address].tokenY.toString()] = {
          address: poolsDataObject[address].tokenY,
          price: coingeckoPricesData?.[coingeckoYId]?.price ?? 0,
          priceChange: coingeckoPricesData?.[coingeckoYId]?.priceChange ?? 0,
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
          fee: +printBN(poolsDataObject[address].fee.v, DECIMAL - 2),
          apy: poolsApy[address] ?? 0
        })
        return
      }

      const tokenX = allTokens[poolsDataObject[address].tokenX.toString()]
      const tokenY = allTokens[poolsDataObject[address].tokenY.toString()]

      const lastSnapshot = snapshots[snapshots.length - 1]

      volume24.value += lastSnapshot.volumeX.usdValue24 + lastSnapshot.volumeY.usdValue24
      fees24.value += lastSnapshot.feeX.usdValue24 + lastSnapshot.feeY.usdValue24
      tvl24.value += lastSnapshot.liquidityX.usdValue24 + lastSnapshot.liquidityY.usdValue24

      if (snapshots.length > 1) {
        const prevSnapshot = snapshots[snapshots.length - 2]

        prevVolume24 += prevSnapshot.volumeX.usdValue24 + prevSnapshot.volumeY.usdValue24
        prevFees24 += prevSnapshot.feeX.usdValue24 + prevSnapshot.feeY.usdValue24
        prevTvl24 += prevSnapshot.liquidityX.usdValue24 + prevSnapshot.liquidityY.usdValue24
      }

      tokensDataObject[tokenX.address.toString()].volume24 += lastSnapshot.volumeX.usdValue24
      tokensDataObject[tokenY.address.toString()].volume24 += lastSnapshot.volumeY.usdValue24
      tokensDataObject[tokenX.address.toString()].tvl += lastSnapshot.liquidityX.usdValue24
      tokensDataObject[tokenY.address.toString()].tvl += lastSnapshot.liquidityY.usdValue24

      poolsData.push({
        volume24: lastSnapshot.volumeX.usdValue24 + lastSnapshot.volumeY.usdValue24,
        tvl: lastSnapshot.liquidityX.usdValue24 + lastSnapshot.liquidityY.usdValue24,
        tokenX: poolsDataObject[address].tokenX,
        tokenY: poolsDataObject[address].tokenY,
        fee: +printBN(poolsDataObject[address].fee.v, DECIMAL - 2),
        apy: poolsApy[address] ?? 0
      })

      snapshots.slice(-30).forEach(snapshot => {
        const timestamp = snapshot.timestamp.toString()

        if (!volumeForTimestamps[timestamp]) {
          volumeForTimestamps[timestamp] = 0
        }

        if (!liquidityForTimestamps[timestamp]) {
          liquidityForTimestamps[timestamp] = 0
        }

        volumeForTimestamps[timestamp] += snapshot.volumeX.usdValue24 + snapshot.volumeY.usdValue24
        liquidityForTimestamps[timestamp] +=
          snapshot.liquidityX.usdValue24 + snapshot.liquidityY.usdValue24
      })
    })

    volume24.change = ((volume24.value - prevVolume24) / prevVolume24) * 100
    tvl24.change = ((tvl24.value - prevTvl24) / prevTvl24) * 100
    fees24.change = ((fees24.value - prevFees24) / prevFees24) * 100

    const volumePlot: TimeData[] = Object.entries(volumeForTimestamps).map(
      ([timestamp, value]) => ({
        timestamp: +timestamp,
        value
      })
    )
    const liquidityPlot: TimeData[] = Object.entries(liquidityForTimestamps).map(
      ([timestamp, value]) => ({
        timestamp: +timestamp,
        value
      })
    )

    yield* put(
      actions.setCurrentStats({
        volume24,
        tvl24,
        fees24,
        tokensData: Object.values(tokensDataObject),
        poolsData,
        volumePlot,
        liquidityPlot
      })
    )
  } catch (error) {
    console.log(error)
  }
}

export function* statsHandler(): Generator {
  yield* takeEvery(actions.getCurrentStats, getStats)
}
