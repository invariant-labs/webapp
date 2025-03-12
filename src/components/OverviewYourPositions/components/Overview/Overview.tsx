import React, { useEffect, useMemo, useState } from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { HeaderSection } from '../HeaderSection/HeaderSection'
import { UnclaimedSection } from '../UnclaimedSection/UnclaimedSection'
import { useStyles } from './styles/styles'
import { ProcessedPool } from '@store/types/userOverview'
import { useDispatch, useSelector } from 'react-redux'
import { theme } from '@static/theme'
import ResponsivePieChart from '../OverviewPieChart/ResponsivePieChart'
import {
  isLoadingPositionsList,
  positionsWithPoolsData,
  positionsList as list,
  unclaimedFees,
  PoolWithAddressAndIndex
} from '@store/selectors/positions'
import { getTokenPrice } from '@utils/utils'
import MobileOverview from '../MobileOverview/MobileOverview'
import LegendSkeleton from './skeletons/LegendSkeleton'
import { useAverageLogoColor } from '@store/hooks/userOverview/useAverageLogoColor'
import { useAgregatedPositions } from '@store/hooks/userOverview/useAgregatedPositions'
import icons from '@static/icons'
import { actions, PositionWithAddress } from '@store/reducers/positions'
import { LegendOverview } from '../LegendOverview/LegendOverview'
import { SwapToken } from '@store/selectors/solanaWallet'

interface OverviewProps {
  poolAssets: ProcessedPool[]
}

export interface ISinglePositionData extends PositionWithAddress {
  poolData: PoolWithAddressAndIndex
  tokenX: SwapToken
  tokenY: SwapToken
  positionIndex: number
}

export type EmptyStateClasses = Record<'emptyState' | 'emptyStateText', string>

export const Overview: React.FC<OverviewProps> = () => {
  const positionList = useSelector(positionsWithPoolsData)
  const isLg = useMediaQuery(theme.breakpoints.down('lg'))
  const { isAllClaimFeesLoading } = useSelector(list)
  const isLoadingList = useSelector(isLoadingPositionsList)
  const { classes } = useStyles()
  const dispatch = useDispatch()

  const [prices, setPrices] = useState<
    Record<string, { price: number; buyPrice: number; sellPrice: number }>
  >({})

  const [logoColors, setLogoColors] = useState<Record<string, string>>({})
  const [pendingColorLoads, setPendingColorLoads] = useState<Set<string>>(new Set())
  const { total: totalUnclaimedFee } = useSelector(unclaimedFees)
  const { getAverageColor, getTokenColor, tokenColorOverrides } = useAverageLogoColor()
  const { positions } = useAgregatedPositions(positionList, prices)

  const isColorsLoading = useMemo(() => pendingColorLoads.size > 0, [pendingColorLoads])

  const sortedPositions = useMemo(() => {
    return [...positions].sort((a, b) => b.value - a.value)
  }, [positions])

  const chartColors = useMemo(
    () =>
      sortedPositions.map(position =>
        getTokenColor(position.token, logoColors[position.logo ?? ''] ?? '', tokenColorOverrides)
      ),
    [sortedPositions, logoColors, getTokenColor, tokenColorOverrides]
  )

  const totalAssets = useMemo(
    () => positions.reduce((acc, position) => acc + position.value, 0),
    [positions]
  )
  const handleClaimAll = () => {
    dispatch(actions.claimAllFee())
  }

  const isDataReady = !isLoadingList && !isColorsLoading && Object.keys(prices).length > 0

  const data = useMemo(() => {
    if (!isDataReady) return []

    const tokens: { label: string; value: number }[] = []
    sortedPositions.forEach(position => {
      const existingToken = tokens.find(token => token.label === position.token)
      if (existingToken) {
        existingToken.value += position.value
      } else {
        tokens.push({
          label: position.name,
          value: position.value
        })
      }
    })
    return tokens
  }, [sortedPositions, isDataReady])

  useEffect(() => {
    if (Object.keys(prices).length > 0) {
      dispatch(actions.setPrices(prices))
    }
  }, [prices])

  useEffect(() => {
    const loadPrices = async () => {
      const uniqueTokens = new Set<string>()
      positionList.forEach(position => {
        uniqueTokens.add(position.tokenX.assetAddress.toString())
        uniqueTokens.add(position.tokenY.assetAddress.toString())
      })

      const tokenArray = Array.from(uniqueTokens)
      const priceResults = await Promise.all(
        tokenArray.map(async token => ({
          token,
          priceData: await getTokenPrice(token)
        }))
      )
      interface NewPrices {
        [token: string]: {
          price: number
          buyPrice: number
          sellPrice: number
          lastBuyPrice: number
          lastSellPrice: number
        }
      }
      const newPrices: NewPrices = priceResults.reduce(
        (acc, { token, priceData }) => ({
          ...acc,
          [token]: priceData ?? {
            price: 0,
            buyPrice: 0,
            sellPrice: 0,
            lastBuyPrice: 0,
            lastSellPrice: 0
          }
        }),
        {}
      )
      setPrices(newPrices)
    }

    loadPrices()
  }, [positionList])

  useEffect(() => {
    sortedPositions.forEach(position => {
      if (position.logo && !logoColors[position.logo] && !pendingColorLoads.has(position.logo)) {
        setPendingColorLoads(prev => new Set(prev).add(position.logo ?? ''))

        getAverageColor(position.logo, position.name)
          .then(color => {
            setLogoColors(prev => ({
              ...prev,
              [position.logo ?? '']: color
            }))
            setPendingColorLoads(prev => {
              const next = new Set(prev)
              next.delete(position.logo ?? '')
              return next
            })
          })
          .catch(error => {
            console.error('Error getting color for logo:', error)
            setPendingColorLoads(prev => {
              const next = new Set(prev)
              next.delete(position.logo ?? '')
              return next
            })
          })
      }
    })
  }, [sortedPositions, getAverageColor, logoColors, pendingColorLoads])

  useEffect(() => {
    if (Object.keys(prices).length > 0) {
      dispatch(actions.calculateTotalUnclaimedFees())

      const interval = setInterval(() => {
        dispatch(actions.calculateTotalUnclaimedFees())
      }, 60000)

      return () => clearInterval(interval)
    }
  }, [dispatch, prices])

  const EmptyState = ({ classes }: { classes: EmptyStateClasses }) => (
    <Box className={classes.emptyState}>
      <img src={icons.liquidityEmpty} alt='Empty portfolio' height={80} width={80} />
      <Typography className={classes.emptyStateText}>No liquidity found</Typography>
    </Box>
  )

  if (!isLoadingList && positions.length === 0) {
    return (
      <Box className={classes.container}>
        <HeaderSection totalValue={0} loading={false} />
        <UnclaimedSection unclaimedTotal={0} loading={false} handleClaimAll={undefined} />
        <EmptyState classes={classes} />
      </Box>
    )
  }

  return (
    <Box className={classes.container}>
      <HeaderSection totalValue={totalAssets} loading={isLoadingList} />
      <UnclaimedSection
        unclaimedTotal={totalUnclaimedFee}
        handleClaimAll={handleClaimAll}
        loading={isLoadingList || isAllClaimFeesLoading}
      />

      {isLg ? (
        <MobileOverview
          positions={sortedPositions}
          totalAssets={totalAssets}
          chartColors={chartColors}
        />
      ) : (
        <Box className={classes.legendSection}>
          <Box sx={{ width: '850px' }}>
            {!isDataReady ? (
              <LegendSkeleton />
            ) : (
              <LegendOverview
                logoColors={logoColors}
                sortedPositions={sortedPositions}
                tokenColorOverrides={tokenColorOverrides}
              />
            )}
          </Box>

          <Box className={classes.pieChartSection}>
            <ResponsivePieChart data={data} chartColors={chartColors} isLoading={!isDataReady} />
          </Box>
        </Box>
      )}
    </Box>
  )
}
