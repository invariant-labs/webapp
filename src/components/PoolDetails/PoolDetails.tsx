import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import useStyles from './style'
import Chart from './Chart/Chart'
import { NetworkType } from '@store/consts/static'
import { PoolSnap } from '@store/reducers/stats'
import { SwapToken } from '@store/selectors/solanaWallet'
import { PoolWithAddress } from '@store/reducers/pools'
import { Intervals as IntervalsKeys } from '@store/consts/static'
import { PoolChartSwitch, TokenReserve } from '@store/consts/types'
import { VariantType } from 'notistack'
import { backIcon } from '@static/icons'
import PoolInfo from './PoolInfo/PoolInfo'

export interface IProps {
  network: NetworkType
  statsPoolData: PoolSnap
  tokenX: SwapToken | null
  tokenY: SwapToken | null
  handleOpenSwap: () => void
  handleOpenPosition: () => void
  poolData: PoolWithAddress | null
  isPoolDataLoading: boolean
  interval: IntervalsKeys
  isLoadingStats: boolean
  lastStatsTimestamp: number
  setChartType: (type: PoolChartSwitch) => void
  copyAddressHandler: (message: string, variant: VariantType) => void
  updateInterval: (interval: IntervalsKeys) => void
  tokenXReserve: TokenReserve | null
  tokenYReserve: TokenReserve | null
  prices: { tokenX: number; tokenY: number }
  selectFeeTier: (value: number) => void
  feeTiers: number[]
  handleBack: () => void
  feeTiersWithTvl: Record<number, number>
  aggregatedStats: { tvl: number; fees: number; volume: number }
  feeTierIndex: number
  onRefresh: () => void
  isFavourite: boolean
  switchFavouritePool: () => void
  isDisabled: boolean
  disabledFeeTiers: string[]
  tokens: SwapToken[]
  setTokens: (tokenX: SwapToken, tokenY: SwapToken) => void
  handleAddToken: (address: string) => void
  onCreateNewPool: () => void
  sameTokensError: boolean
}

export const PoolDetails: React.FC<IProps> = ({
  network,
  statsPoolData,
  tokenX,
  tokenY,
  handleOpenSwap,
  handleOpenPosition,
  poolData,
  isPoolDataLoading,
  interval,
  isLoadingStats,
  lastStatsTimestamp,
  setChartType,
  copyAddressHandler,
  updateInterval,
  tokenXReserve,
  tokenYReserve,
  prices,
  selectFeeTier,
  feeTiers,
  handleBack,
  feeTiersWithTvl,
  aggregatedStats,
  feeTierIndex,
  onRefresh,
  isFavourite,
  switchFavouritePool,
  isDisabled,
  disabledFeeTiers,
  tokens,
  setTokens,
  handleAddToken,
  onCreateNewPool,
  sameTokensError
}) => {
  const { classes } = useStyles()

  const initialHideUnknownTokensValue =
    localStorage.getItem('HIDE_UNKNOWN_TOKENS') === 'true' ||
    localStorage.getItem('HIDE_UNKNOWN_TOKENS') === null

  const setHideUnknownTokensValue = (val: boolean) => {
    localStorage.setItem('HIDE_UNKNOWN_TOKENS', val ? 'true' : 'false')
  }

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    const timeout = setTimeout(() => {
      if (!isPoolDataLoading && !isLoadingStats) {
        setIsLoading(false)
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [isPoolDataLoading, isLoadingStats])

  return (
    <Grid className={classes.wrapper}>
      <Grid onClick={() => handleBack()} className={classes.back} container item>
        <img className={classes.backIcon} src={backIcon} alt='back' />
        <Typography className={classes.backText}>Back</Typography>
      </Grid>
      <Grid className={classes.upperContainer}>
        <Chart
          poolAddress={poolData?.address.toString() ?? ''}
          copyAddressHandler={copyAddressHandler}
          network={network}
          statsPoolData={statsPoolData}
          tokenX={tokenX}
          tokenY={tokenY}
          handleOpenSwap={handleOpenSwap}
          handleOpenPosition={handleOpenPosition}
          isPoolDataLoading={isPoolDataLoading}
          interval={interval}
          lastStatsTimestamp={lastStatsTimestamp}
          setChartType={setChartType}
          updateInterval={updateInterval}
          selectFeeTier={selectFeeTier}
          feeTiers={feeTiers}
          feeTiersWithTvl={feeTiersWithTvl}
          aggregatedStats={aggregatedStats}
          feeTierIndex={feeTierIndex}
          isDisabled={isDisabled}
          disabledFeeTiers={disabledFeeTiers}
          tokens={tokens}
          setTokens={setTokens}
          handleAddToken={handleAddToken}
          initialHideUnknownTokensValue={initialHideUnknownTokensValue}
          setHideUnknownTokensValue={setHideUnknownTokensValue}
          noData={!poolData?.address.toString() && !isPoolDataLoading && !isLoadingStats}
          onCreateNewPool={onCreateNewPool}
          sameTokensError={sameTokensError}
          isLoadingChart={isLoading}
        />
        <PoolInfo
          interval={interval}
          statsPoolData={statsPoolData}
          isLoadingStats={isLoadingStats}
          tokenX={tokenX}
          tokenY={tokenY}
          tokenXReserve={tokenXReserve}
          tokenYReserve={tokenYReserve}
          prices={prices}
          copyAddressHandler={copyAddressHandler}
          network={network}
          onRefresh={onRefresh}
          isFavourite={isFavourite}
          switchFavouritePool={switchFavouritePool}
          isPoolDataLoading={isPoolDataLoading}
          poolAddress={poolData?.address.toString() ?? ''}
          noData={!poolData?.address.toString() && !isLoading}
        />
      </Grid>
      {/* <Transactions /> */}
    </Grid>
  )
}

export default PoolDetails
