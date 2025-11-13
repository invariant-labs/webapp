import { colors, theme } from '@static/theme'
import { CumulativeValue, TimeData, Value24H } from '@store/reducers/stats'
import { ChartSwitch, Intervals as IntervalsKeys } from '@store/consts/static'
import { useStyles } from './style'
import { Grid, Typography, Box, useMediaQuery } from '@mui/material'
import Intervals from '../Intervals/Intervals'
import { Separator } from '@common/Separator/Separator'
import Volume from '../Volume/Volume'
import Liquidity from '../Liquidity/Liquidity'
import VolumeBar from '../volumeBar/VolumeBar'
import { formatNumberWithoutSuffix } from '@utils/utils'

interface IOverview {
  lastUsedInterval: IntervalsKeys | null
  updateInterval: (interval: IntervalsKeys) => void
  volumeInterval: Value24H
  volumePlotData: TimeData[]
  isLoadingStats: boolean
  lastStatsTimestamp: number
  liquidityPlotData: TimeData[]
  feesPlotData: TimeData[]
  tvlInterval: Value24H
  feesInterval: Value24H
  cumulativeVolume: CumulativeValue
  cumulativeFees: CumulativeValue
  setChartType: (type: ChartSwitch) => void
}

const Overview: React.FC<IOverview> = ({
  lastUsedInterval,
  updateInterval,
  volumeInterval,
  volumePlotData,
  isLoadingStats,
  lastStatsTimestamp,
  liquidityPlotData,
  tvlInterval,
  feesInterval,
  cumulativeVolume,
  cumulativeFees,
  feesPlotData,
  setChartType
}) => {
  const { classes, cx } = useStyles()

  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isMd = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={4}>
        <Typography className={classes.subheader}>Overview</Typography>
      </Box>
      <Grid
        container
        className={cx(classes.plotsRow, {
          [classes.loadingOverlay]: isLoadingStats
        })}>
        <>
          <Box display='flex' alignItems='center' gap={3} flexDirection={isMd ? 'column' : 'row'}>
            <Box
              display='flex'
              alignItems='center'
              gap={isMd ? 1 : 6}
              flexWrap={'wrap'}
              flexShrink={1}
              flexDirection={isMd ? 'column' : 'row'}
              width={isMd ? '100%' : 'auto'}>
              <Box
                display='flex'
                width={isMd ? '100%' : 'auto'}
                alignItems='center'
                gap={1}
                justifyContent={isMd ? 'space-between' : 'flex-start'}>
                <Typography className={classes.label}>Cumulative Volume:</Typography>

                <Typography className={classes.value}>
                  ${formatNumberWithoutSuffix(cumulativeVolume.value)}
                </Typography>
              </Box>
              <Box
                display='flex'
                width={isMd ? '100%' : 'auto'}
                alignItems='center'
                gap={1}
                justifyContent={isMd ? 'space-between' : 'flex-start'}>
                <Typography className={classes.label}>Cumulative Fee:</Typography>

                <Typography className={classes.value}>
                  ${formatNumberWithoutSuffix(cumulativeFees.value)}
                </Typography>
              </Box>
            </Box>

            {isMd && (
              <Box width={'100%'}>
                <Separator
                  color={colors.invariant.light}
                  width={1}
                  isHorizontal
                  margin={isMd ? '0 24px' : '0'}
                />
              </Box>
            )}
            <Box
              display='flex'
              flexGrow={1}
              minWidth={'min-content'}
              width={isSm ? '100%' : 'auto'}>
              <Intervals
                interval={lastUsedInterval ?? IntervalsKeys.Daily}
                setInterval={updateInterval}
                dark
                fullWidth={isSm}
              />
            </Box>
          </Box>
          {!isMd && (
            <Separator color={colors.invariant.light} margin={'24px 0'} width={1} isHorizontal />
          )}
          <Box
            display='flex'
            gap={'24px'}
            flexDirection={isMd ? 'column' : 'row'}
            mt={isMd ? '24px' : 0}>
            <Volume
              volume={volumeInterval.value}
              fees={feesInterval.value}
              volumeData={volumePlotData}
              feesData={feesPlotData}
              className={classes.plot}
              isLoading={isLoadingStats}
              lastStatsTimestamp={lastStatsTimestamp}
              interval={lastUsedInterval ?? IntervalsKeys.Daily}
              setChartType={setChartType}
            />

            <Separator
              color={colors.invariant.light}
              margin={isMd ? '0 24px' : '0'}
              width={1}
              isHorizontal={isMd}
            />

            <Liquidity
              liquidityVolume={tvlInterval.value}
              data={liquidityPlotData}
              className={classes.plot}
              isLoading={isLoadingStats}
              lastStatsTimestamp={lastStatsTimestamp}
              interval={lastUsedInterval ?? IntervalsKeys.Daily}
            />
          </Box>
        </>
      </Grid>
      <Grid className={classes.volumeBar}>
        <VolumeBar
          volume={volumeInterval.value}
          percentVolume={volumeInterval.change}
          tvlVolume={tvlInterval.value}
          percentTvl={tvlInterval.change}
          feesVolume={feesInterval.value}
          percentFees={feesInterval.change}
          isLoading={isLoadingStats}
          interval={lastUsedInterval ?? IntervalsKeys.Daily}
        />
      </Grid>
    </>
  )
}

export default Overview
