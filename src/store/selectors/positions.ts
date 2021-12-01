import { Token, tokens } from '@consts/static'
import { PoolWithAddress } from '@reducers/pools'
import BN from 'bn.js'
import { createSelector } from 'reselect'
import { IPositionsStore, positionsSliceName } from '../reducers/positions'
import { keySelectors, AnyProps } from './helpers'
import { pools } from './pools'

const store = (s: AnyProps) => s[positionsSliceName] as IPositionsStore

export const { positionsList, plotTicks } = keySelectors(store, ['positionsList', 'plotTicks'])

export const isLoadingPositionsList = createSelector(
  positionsList,
  (s) => s.loading
)

export const positionsWithPoolsData = createSelector(
  pools,
  positionsList,
  (allPools, { list }) => {
    const tokensByKey: Record<string, Token> = tokens.reduce((prev, token) => {
      return {
        [token.address.toString()]: token,
        ...prev
      }
    }, {})

    const poolsByKey: Record<string, PoolWithAddress & { poolIndex: number }> = allPools.reduce((prev, pool, index) => {
      return {
        [pool.address.toString()]: pool,
        poolIndex: index,
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
  (positions) => positions.find((position) => position.id.eq(new BN(id)))
)

export const positionsSelectors = { positionsList, plotTicks }

export default positionsSelectors
