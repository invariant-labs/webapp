import React, { useEffect, useMemo, useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { HeaderSection } from '../HeaderSection/HeaderSection'
import { UnclaimedSection } from '../UnclaimedSection/UnclaimedSection'
import { useStyles } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { theme } from '@static/theme'
import ResponsivePieChart from '../OverviewPieChart/ResponsivePieChart'
import {
  isLoadingPositionsList,
  positionsWithPoolsData,
  positionsList as list,
  PoolWithAddressAndIndex,
  totalUnlaimedFees
} from '@store/selectors/positions'
import { getTokenPrice } from '@utils/utils'
import MobileOverview from '../MobileOverview/MobileOverview'
import { useAverageLogoColor } from '@store/hooks/userOverview/useAverageLogoColor'
import { useAgregatedPositions } from '@store/hooks/userOverview/useAgregatedPositions'
import { actions, PositionWithAddress } from '@store/reducers/positions'
import { LegendOverview } from '../LegendOverview/LegendOverview'
import { SwapToken } from '@store/selectors/solanaWallet'
import { IPositionItem } from '@store/consts/types'
import { EmptyState } from './EmptyState/EmptyState'
import LegendSkeleton from './skeletons/LegendSkeleton'

interface OverviewProps {
  poolAssets: IPositionItem[]
}

export interface ISinglePositionData extends PositionWithAddress {
  poolData: PoolWithAddressAndIndex
  tokenX: SwapToken
  tokenY: SwapToken
  positionIndex: number
}

export const Overview: React.FC<OverviewProps> = () => {
  const positionList = useSelector(positionsWithPoolsData)
  const isLg = useMediaQuery(theme.breakpoints.down('md'))
  const { isAllClaimFeesLoading } = useSelector(list)
  const isLoadingList = useSelector(isLoadingPositionsList)
  const { classes } = useStyles()
  const dispatch = useDispatch()

  const [prices, setPrices] = useState<
    Record<string, { price: number; buyPrice: number; sellPrice: number }>
  >({})

  const [logoColors, setLogoColors] = useState<Record<string, string>>({})
  const [pendingColorLoads, setPendingColorLoads] = useState<Set<string>>(new Set())
  const { total: unclaimedFees, isLoading: unClaimedFeesLoading } = useSelector(totalUnlaimedFees)
  const { getAverageColor, getTokenColor, tokenColorOverrides } = useAverageLogoColor()
  const { positions } = useAgregatedPositions(positionList, prices)

  const isColorsLoading = useMemo(() => pendingColorLoads.size > 0, [pendingColorLoads])

  const sortedTokens = useMemo(() => positions.sort((a, b) => b.value - a.value), [positions])

  const chartColors = useMemo(
    () =>
      sortedTokens.map(position =>
        getTokenColor(position.token, logoColors[position.logo ?? ''] ?? '', tokenColorOverrides)
      ),
    [sortedTokens, logoColors, getTokenColor, tokenColorOverrides]
  )

  const totalAssets = useMemo(() => {
    const value = positions.reduce((acc, position) => acc + position.value || 0, 0)
    const isPriceWarning = positions.some(position => position.isPriceWarning)

    return { value, isPriceWarning }
  }, [positions])

  const handleClaimAll = () => {
    dispatch(actions.claimAllFee())
  }

  const isDataReady = !isLoadingList && !isColorsLoading && Object.keys(prices).length > 0

  const data = useMemo(() => {
    if (!isDataReady) return []

    const tokens: { label: string; value: number }[] = []
    sortedTokens.forEach(position => {
      const existingToken = tokens.find(token => token.label === position.token)
      if (existingToken) {
        existingToken.value += position.value
      } else {
        tokens.push({
          label: position.name,
          value: position.value || 0
        })
      }
    })

    return tokens
  }, [sortedTokens, isDataReady])

  useEffect(() => {
    if (Object.keys(prices).length > 0) {
      dispatch(actions.setPrices(prices))
    }
  }, [prices])

  useEffect(() => {
    const loadPrices = async () => {
      const uniqueTokens = new Set<{ address: string; coingeckoId?: string }>()
      positionList.forEach(position => {
        uniqueTokens.add({
          address: position.tokenX.assetAddress.toString(),
          coingeckoId: position.tokenX.coingeckoId
        })
        uniqueTokens.add({
          address: position.tokenY.assetAddress.toString(),
          coingeckoId: position.tokenY.coingeckoId
        })
      })

      const tokenArray = Array.from(uniqueTokens)
      const priceResults = await Promise.all(
        tokenArray.map(async token => ({
          token,
          priceData: await getTokenPrice(token.address, token.coingeckoId)
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
          [token.address]: priceData ?? {
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
  }, [positionList.length])

  useEffect(() => {
    sortedTokens.forEach(position => {
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
  }, [sortedTokens, getAverageColor, logoColors, pendingColorLoads])

  if (!isLoadingList && positions.length === 0) {
    return (
      <Box className={classes.container}>
        <HeaderSection totalValue={{ value: 0, isPriceWarning: false }} loading={false} />
        <UnclaimedSection unclaimedAmount={0} loading={false} handleClaimAll={undefined} />
        <EmptyState />
      </Box>
    )
  }

  return (
    <Box className={classes.container}>
      <HeaderSection totalValue={totalAssets} loading={isLoadingList} />
      <UnclaimedSection
        unclaimedAmount={unclaimedFees}
        handleClaimAll={handleClaimAll}
        loading={isLoadingList || isAllClaimFeesLoading || unClaimedFeesLoading}
      />

      {isLg ? (
        <MobileOverview
          isLoadingList={isLoadingList}
          sortedTokens={sortedTokens}
          totalAssets={totalAssets}
          chartColors={chartColors}
        />
      ) : (
        <Box className={classes.legendSection}>
          <Box display='flex' flexShrink={1} justifyContent='flex-end' sx={{ width: '850px' }}>
            {!isDataReady ? (
              <LegendSkeleton />
            ) : (
              <LegendOverview
                logoColors={logoColors}
                sortedTokens={sortedTokens}
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
