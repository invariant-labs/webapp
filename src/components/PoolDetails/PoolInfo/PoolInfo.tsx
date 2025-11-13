import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import useStyles from './style'
import InfoUpperSection from './InfoUpperSection/InfoUpperSection'
import { PoolSnap } from '@store/reducers/stats'
import { Intervals as IntervalsKeys, NetworkType } from '@store/consts/static'
import { SwapToken } from '@store/selectors/solanaWallet'
import { TokenReserve } from '@store/consts/types'
import { VariantType } from 'notistack'
import { refreshIcon, star, starFill } from '@static/icons'
import { EmptyPlaceholder } from '@common/EmptyPlaceholder/EmptyPlaceholder'
import PercentageScale from './InfoUpperSection/PercentageScale/PercentageScale'
import TokenInfo from './TokenInfo/TokenInfo'

export interface IPros {
  interval: IntervalsKeys
  statsPoolData: PoolSnap
  isLoadingStats: boolean
  tokenX: SwapToken | null
  tokenY: SwapToken | null
  tokenXReserve: TokenReserve | null
  tokenYReserve: TokenReserve | null
  prices: { tokenX: number; tokenY: number }
  copyAddressHandler: (message: string, variant: VariantType) => void
  network: NetworkType
  onRefresh: () => void
  isFavourite: boolean
  switchFavouritePool: () => void
  isPoolDataLoading: boolean
  poolAddress: string
  noData: boolean
}

export const PoolInfo: React.FC<IPros> = ({
  interval,
  statsPoolData,
  isLoadingStats,
  tokenX,
  tokenY,
  tokenXReserve,
  tokenYReserve,
  prices,
  copyAddressHandler,
  network,
  onRefresh,
  isFavourite,
  switchFavouritePool,
  isPoolDataLoading,
  poolAddress,
  noData
}) => {
  const { classes } = useStyles()
  const tokenXUsdAmount = tokenXReserve ? prices.tokenX * tokenXReserve.uiAmount : 0
  const tokenYUsdAmount = tokenYReserve ? prices.tokenY * tokenYReserve.uiAmount : 0

  const [tokenXPercentage, tokenYPercentage] = React.useMemo(() => {
    if (!tokenX || !tokenY || !tokenXReserve || !tokenYReserve) return [null, null]

    const tokenXPercentage = (tokenXUsdAmount / (tokenXUsdAmount + tokenYUsdAmount)) * 100
    const tokenYPercentage = (tokenYUsdAmount / (tokenXUsdAmount + tokenYUsdAmount)) * 100

    return [tokenXPercentage, tokenYPercentage]
  }, [tokenX, tokenY, tokenXReserve, tokenYReserve, prices])

  if (!tokenX || !tokenY) return null

  return (
    <Grid className={classes.wrapper}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography className={classes.header}>Overview</Typography>
        <Box display='flex' alignItems='center' gap={'8px'}>
          {!noData && (
            <img
              className={classes.favouriteButton}
              src={isFavourite ? starFill : star}
              onClick={e => {
                if (isLoadingStats) return
                switchFavouritePool()
                e.stopPropagation()
              }}
            />
          )}
          <Button onClick={onRefresh} className={classes.refreshIconBtn}>
            <img src={refreshIcon} className={classes.refreshIcon} alt='Refresh' />
          </Button>
        </Box>
      </Box>

      <Grid className={classes.container}>
        {noData && !statsPoolData.fees && !isPoolDataLoading && !isLoadingStats ? (
          <EmptyPlaceholder
            mainTitle='Pool info not found'
            desc=''
            newVersion
            roundedCorners
            withButton={false}
            desc2=''
            height={'100%'}
            withImg={false}
          />
        ) : (
          <>
            <InfoUpperSection
              interval={interval}
              statsPoolData={statsPoolData}
              isLoadingStats={isLoadingStats}
              poolAddress={poolAddress}
            />
            <Box className={classes.separator} />

            <PercentageScale
              tokenX={tokenX}
              tokenY={tokenY}
              tokenXPercentage={tokenXPercentage}
              tokenYPercentage={tokenYPercentage}
              isPoolDataLoading={isPoolDataLoading}
            />
            <Grid
              container
              display='flex'
              flex={1}
              gap='20px'
              flexDirection='column'
              mt={'20px'}
              justifyContent={'space-evenly'}>
              <TokenInfo
                token={tokenX}
                copyAddressHandler={copyAddressHandler}
                network={network}
                amount={tokenXReserve?.uiAmount}
                price={prices.tokenX}
                isPoolDataLoading={isPoolDataLoading}
              />
              <TokenInfo
                token={tokenY}
                copyAddressHandler={copyAddressHandler}
                network={network}
                amount={tokenYReserve?.uiAmount}
                price={prices.tokenY}
                isPoolDataLoading={isPoolDataLoading}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default PoolInfo
