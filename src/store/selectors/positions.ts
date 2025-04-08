import { PoolWithAddress } from '@store/reducers/pools'
import { createSelector } from 'reselect'
import { IPositionsStore, positionsSliceName, PositionWithAddress } from '../reducers/positions'
import { AnyProps, keySelectors } from './helpers'
import { poolsArraySortedByFees } from './pools'
import { SwapToken, swapTokensDict } from './solanaWallet'
import { printBN } from '@utils/utils'
import { calculateClaimAmount } from '@invariant-labs/sdk/lib/utils'

const store = (s: AnyProps) => s[positionsSliceName] as IPositionsStore

export const {
  lastPage,
  positionsList,
  prices,
  plotTicks,
  currentPoolIndex,
  initPosition,
  shouldNotUpdateRange,
  currentPositionId,
  showFeesLoader
} = keySelectors(store, [
  'lastPage',
  'positionsList',
  'prices',
  'plotTicks',
  'currentPoolIndex',
  'initPosition',
  'shouldNotUpdateRange',
  'currentPositionId',
  'showFeesLoader'
])

export const lastPageSelector = lastPage

export const isLoadingPositionsList = createSelector(positionsList, s => s.loading)

export interface PoolWithAddressAndIndex extends PoolWithAddress {
  poolIndex: number
}

export interface PositionWithPoolData extends PositionWithAddress {
  poolData: PoolWithAddressAndIndex
  tokenX: SwapToken
  tokenY: SwapToken
  positionIndex: number
}

export type PositionData = ReturnType<typeof positionsWithPoolsData>[number]

export const positionsWithPoolsData = createSelector(
  poolsArraySortedByFees,
  positionsList,
  swapTokensDict,
  (allPools, { list }, tokens) => {
    const poolsByKey: Record<string, PoolWithAddressAndIndex> = {}
    allPools.forEach((pool, index) => {
      poolsByKey[pool.address.toString()] = {
        ...pool,
        poolIndex: index
      }
    })

    return list.map((position, index) => ({
      ...position,
      poolData: poolsByKey[position.pool.toString()],
      tokenX: tokens[poolsByKey[position.pool.toString()].tokenX.toString()],
      tokenY: tokens[poolsByKey[position.pool.toString()].tokenY.toString()],
      positionIndex: index
    }))
  }
)

export const singlePositionData = (id: string) =>
  createSelector(positionsWithPoolsData, positions =>
    positions.find(position => id === position.id.toString() + '_' + position.pool.toString())
  )

export const currentPositionData = createSelector(
  currentPositionId,
  positionsWithPoolsData,
  (id, positions) => {
    if (!id) return undefined
    return positions.find(
      position => id === position.id.toString() + '_' + position.pool.toString()
    )
  }
)

export const totalUnlaimedFees = createSelector(
  positionsWithPoolsData,
  prices,
  (positions, pricesData) => {
    const isLoading = positions.some(position => position.ticksLoading)

    const total = positions.reduce((acc: number, position) => {
      const [bnX, bnY] = calculateClaimAmount({
        position,
        tickLower: position.lowerTick,
        tickUpper: position.upperTick,
        tickCurrent: position.poolData.currentTickIndex,
        feeGrowthGlobalX: position.poolData.feeGrowthGlobalX,
        feeGrowthGlobalY: position.poolData.feeGrowthGlobalY
      })

      const xValue =
        +printBN(bnX, position.tokenX.decimals) *
        (pricesData.data[position.tokenX.assetAddress.toString()]?.price ?? 0)
      const yValue =
        +printBN(bnY, position.tokenY.decimals) *
        (pricesData.data[position.tokenY.assetAddress.toString()]?.price ?? 0)

      return acc + xValue + yValue
    }, 0)

    return { total, isLoading }
  }
)

export const positionsSelectors = {
  positionsList,
  plotTicks,
  initPosition,
  shouldNotUpdateRange,
  currentPositionId,
  showFeesLoader
}

export default positionsSelectors
