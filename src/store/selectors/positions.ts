import { PoolWithAddress } from '@store/reducers/pools'
import { createSelector } from 'reselect'
import { IPositionsStore, positionsSliceName, PositionWithAddress } from '../reducers/positions'
import { AnyProps, keySelectors } from './helpers'
import { poolsArraySortedByFees } from './pools'
import { SwapToken, swapTokensDict } from './solanaWallet'

const store = (s: AnyProps) => s[positionsSliceName] as IPositionsStore

export const {
  lastPage,
  positionsList,
  plotTicks,
  currentPoolIndex,
  currentPositionTicks,
  initPosition,
  shouldNotUpdateRange,
  currentPositionId
} = keySelectors(store, [
  'lastPage',
  'positionsList',
  'plotTicks',
  'currentPoolIndex',
  'currentPositionTicks',
  'initPosition',
  'shouldNotUpdateRange',
  'currentPositionId'
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

export const positionsSelectors = {
  positionsList,
  plotTicks,
  currentPositionTicks,
  initPosition,
  shouldNotUpdateRange,
  currentPositionId
}

export default positionsSelectors
