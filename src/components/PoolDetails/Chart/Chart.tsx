import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import useStyles from './style'
import { NetworkType } from '@store/consts/static'
import { SwapToken } from '@store/selectors/solanaWallet'
import { PoolSnap } from '@store/reducers/stats'

import { Intervals as IntervalsKeys } from '@store/consts/static'
import { PoolChartSwitch } from '@store/consts/types'
import { VariantType } from 'notistack'
import { EmptyPlaceholder } from '@common/EmptyPlaceholder/EmptyPlaceholder'
import ChartUpperSection from './CharUpperSection/ChartUpperSection'
import ChartLowerSection from './ChartLowerSection/ChartLowerSection'

export interface IProps {
  poolAddress: string
  copyAddressHandler: (message: string, variant: VariantType) => void
  network: NetworkType
  statsPoolData: PoolSnap
  tokenX: SwapToken | null
  tokenY: SwapToken | null
  handleOpenSwap: () => void
  handleOpenPosition: () => void
  isPoolDataLoading: boolean
  interval: IntervalsKeys
  lastStatsTimestamp: number
  setChartType: (type: PoolChartSwitch) => void
  updateInterval: (interval: IntervalsKeys) => void
  selectFeeTier: (value: number) => void
  feeTiers: number[]
  feeTiersWithTvl: Record<number, number>
  aggregatedStats: { tvl: number; fees: number; volume: number }
  feeTierIndex: number
  isDisabled: boolean
  disabledFeeTiers: string[]
  tokens: SwapToken[]
  setTokens: (tokenX: SwapToken, tokenY: SwapToken) => void
  handleAddToken: (address: string) => void
  initialHideUnknownTokensValue: boolean
  setHideUnknownTokensValue: (value: boolean) => void
  noData: boolean
  onCreateNewPool: () => void
  sameTokensError: boolean
  isLoadingChart: boolean
}

export const Chart: React.FC<IProps> = ({
  poolAddress,
  copyAddressHandler,
  network,
  statsPoolData,
  tokenX,
  tokenY,
  handleOpenSwap,
  handleOpenPosition,
  isPoolDataLoading,
  interval,
  lastStatsTimestamp,
  setChartType,
  updateInterval,
  selectFeeTier,
  feeTiers,
  feeTiersWithTvl,
  aggregatedStats,
  feeTierIndex,
  isDisabled,
  disabledFeeTiers,
  tokens,
  setTokens,
  handleAddToken,
  initialHideUnknownTokensValue,
  setHideUnknownTokensValue,
  noData,
  onCreateNewPool,
  sameTokensError,
  isLoadingChart
}) => {
  const { classes } = useStyles()

  return (
    <Grid className={classes.wrapper}>
      <Typography className={classes.header}>Performance</Typography>
      <Box className={classes.container}>
        <ChartUpperSection
          copyAddressHandler={copyAddressHandler}
          handleOpenPosition={handleOpenPosition}
          handleOpenSwap={handleOpenSwap}
          isLoading={isPoolDataLoading}
          network={network}
          poolAddress={poolAddress}
          tokenX={tokenX}
          tokenY={tokenY}
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
          noData={noData}
          interval={interval}
        />
        <Box className={classes.separator} />
        {(noData && !isLoadingChart) || sameTokensError ? (
          <EmptyPlaceholder
            height={426}
            newVersion
            mainTitle={
              sameTokensError
                ? 'Please select different tokens'
                : `The ${tokenX?.symbol}/${tokenY?.symbol ?? ''} pool was not found...`
            }
            desc={sameTokensError ? '' : 'You can create it by yourself!'}
            desc2={sameTokensError ? '' : 'Or try to change tokens to find one!'}
            buttonName='Create Pool'
            onAction={onCreateNewPool}
            withButton={!sameTokensError}
            withImg={true}
            roundedCorners
          />
        ) : (
          <ChartLowerSection
            statsPoolData={statsPoolData}
            interval={interval}
            isLoading={isLoadingChart}
            lastStatsTimestamp={lastStatsTimestamp}
            setChartType={setChartType}
            updateInterval={updateInterval}
          />
        )}
      </Box>
    </Grid>
  )
}

export default Chart
