import { Token, tokens } from '@consts/static'
import { PoolWithAddress } from '@reducers/pools'
import { createSelector } from 'reselect'
import { IPositionsStore, positionsSliceName } from '../reducers/positions'
import { keySelectors, AnyProps } from './helpers'
import { pools } from './pools'
import { network } from './solanaConnection'

const store = (s: AnyProps) => s[positionsSliceName] as IPositionsStore

export const { positionsList, plotTicks, currentPositionRangeTicks, initPosition } = keySelectors(store, ['positionsList', 'plotTicks', 'currentPositionRangeTicks', 'initPosition'])

export const isLoadingPositionsList = createSelector(
  positionsList,
  (s) => s.loading
)

export interface PoolWithAddressAndIndex extends PoolWithAddress {
  poolIndex: number
}

export const positionsWithPoolsData = createSelector(
  pools,
  positionsList,
  network,
  (allPools, { list }, networkType) => {
    const tokensByKey: Record<string, Token> = tokens[networkType].reduce((prev, token) => {
      return {
        [token.address.toString()]: token,
        ...prev
      }
    }, {})

    const poolsByKey: Record<string, PoolWithAddressAndIndex> = allPools.reduce((prev, pool, index) => {
      return {
        [pool.address.toString()]: {
          ...pool,
          poolIndex: index
        },
        ...prev
      }
    }, {})

    return list.map((position, index) => ({
      ...position,
      poolData: poolsByKey[position.pool.toString()],
      tokenX: tokensByKey[
        poolsByKey[position.pool.toString()].tokenX.toString()
      ],
      tokenY: tokensByKey[
        poolsByKey[position.pool.toString()].tokenY.toString()
      ],
      positionIndex: index
    }))
  }
)

export const singlePositionData = (id: string) => createSelector(
  positionsWithPoolsData,
  (positions) => positions.find((position) => id === (position.id.toString() + '_' + position.pool.toString()))
)

export const positionsSelectors = { positionsList, plotTicks, currentPositionRangeTicks, initPosition }

export default positionsSelectors
