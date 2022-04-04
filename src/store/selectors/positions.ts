import { PoolWithAddress } from '@reducers/pools'
import { createSelector } from 'reselect'
import { IPositionsStore, positionsSliceName } from '../reducers/positions'
import { keySelectors, AnyProps } from './helpers'
import { poolsArraySortedByFees } from './pools'
import { swapTokensDict } from './solanaWallet'

const store = (s: AnyProps) => s[positionsSliceName] as IPositionsStore

export const { positionsList, plotTicks, currentPositionRangeTicks, initPosition } = keySelectors(
  store,
  ['positionsList', 'plotTicks', 'currentPositionRangeTicks', 'initPosition']
)

export const isLoadingPositionsList = createSelector(positionsList, s => s.loading)

export interface PoolWithAddressAndIndex extends PoolWithAddress {
  poolIndex: number
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

export const positionsSelectors = {
  positionsList,
  plotTicks,
  currentPositionRangeTicks,
  initPosition
}

export default positionsSelectors
