import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopularPools from '@components/PopularPools/PopularPools'
import { isLoading, poolsStatsWithTokensDetails } from '@store/selectors/stats'
import { actions } from '@store/reducers/stats'
import { Grid } from '@mui/material'
import { network } from '@store/selectors/solanaConnection'
import { getPopularPools, Intervals } from '@store/consts/static'
import { unknownTokenIcon } from '@static/icons'
export interface PopularPoolData {
  symbolFrom?: string
  symbolTo?: string
  iconFrom?: string
  iconTo?: string
  volume?: number
  TVL?: number
  fee?: number
  addressFrom: string
  addressTo: string
  apy?: number
  apyData?: {
    fees: number
  }
  isUnknownFrom?: boolean
  isUnknownTo?: boolean
}

export const PopularPoolsWrapper: React.FC = () => {
  const dispatch = useDispatch()

  const currentNetwork = useSelector(network)
  const isLoadingStats = useSelector(isLoading)
  const poolsList = useSelector(poolsStatsWithTokensDetails)

  const list: PopularPoolData[] = useMemo(() => {
    const data: PopularPoolData[] = []

    let popularPools = getPopularPools(currentNetwork)

    if (poolsList.length === 0) {
      const mockPool: PopularPoolData = {
        addressFrom: 'x',
        addressTo: 'y',
        symbolFrom: 'X',
        symbolTo: 'Y',
        iconFrom: unknownTokenIcon,
        iconTo: unknownTokenIcon,
        volume: 0,
        TVL: 0,
        fee: 0,
        apy: 0,
        apyData: {
          fees: 0
        },
        isUnknownFrom: true,
        isUnknownTo: true
      }

      const mockPools: PopularPoolData[] = Array(4).fill(mockPool)
      return mockPools
    }
    if (popularPools.length === 0) {
      popularPools = poolsList
        .sort((a, b) => b.volume24 - a.volume24)
        .slice(0, 4)
        .map(pool => ({
          tokenX: pool.tokenX.toString(),
          tokenY: pool.tokenY.toString(),
          fee: pool.fee.toString()
        }))
    }

    popularPools.map(pool => {
      const poolData = poolsList.find(
        item =>
          ((item.tokenX.toString() === pool.tokenX && item.tokenY.toString() === pool.tokenY) ||
            (item.tokenX.toString() === pool.tokenY && item.tokenY.toString() === pool.tokenX)) &&
          item.fee.toString() === pool.fee
      )
      if (poolData) {
        data.push({
          symbolFrom: poolData?.tokenXDetails?.symbol ?? pool.tokenX,
          symbolTo: poolData?.tokenYDetails?.symbol ?? pool.tokenY,
          iconFrom: poolData?.tokenXDetails?.logoURI ?? unknownTokenIcon,
          iconTo: poolData?.tokenYDetails?.logoURI ?? unknownTokenIcon,
          volume: poolData.volume24,
          TVL: poolData.tvl,
          fee: poolData.fee,
          addressFrom: poolData.tokenX.toString(),
          addressTo: poolData.tokenY.toString(),
          apy: poolData.apy,
          apyData: {
            fees: poolData.apy
          },
          isUnknownFrom: poolData.tokenXDetails?.isUnknown ?? false,
          isUnknownTo: poolData.tokenYDetails?.isUnknown ?? false
        })
      } else {
        data.push({
          addressFrom: pool.tokenX,
          addressTo: pool.tokenY
        })
      }
    })

    return data
  }, [poolsList, isLoadingStats])

  const showAPY = useMemo(() => {
    return list.some(pool => pool.apy !== 0)
  }, [list])

  useEffect(() => {
    dispatch(actions.getCurrentIntervalStats({ interval: Intervals.Daily }))
  }, [])

  return (
    <Grid container>
      <PopularPools
        pools={list}
        isLoading={isLoadingStats || list.length === 0}
        network={currentNetwork}
        showAPY={showAPY}
      />
    </Grid>
  )
}

export default PopularPoolsWrapper
