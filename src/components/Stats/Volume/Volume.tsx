import { ResponsiveBar } from '@nivo/bar'
import { colors, theme, typography } from '@static/theme'
import { linearGradientDef } from '@nivo/core'
import { useStyles } from './style'
import { TimeData } from '@store/reducers/stats'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { formatNumberWithoutSuffix, trimZeros } from '@utils/utils'
import { formatLargeNumber } from '@utils/formatLargeNumber'
import { Intervals as IntervalsKeys } from '@store/consts/static'
import { formatPlotDataLabels, getLabelDate } from '@utils/uiUtils'

interface StatsInterface {
  volume: number | null
  data: TimeData[]
  className?: string
  isLoading: boolean
  interval: IntervalsKeys
  lastStatsTimestamp: number
}

// const GRAPH_ENTRIES = 30

// const generateMockData = () => {
//   return Array.from({ length: GRAPH_ENTRIES }, (_, index) => ({
//     timestamp:
//       Math.floor(Date.now() / (1000 * 60 * 60 * 24)) * (1000 * 60 * 60 * 24) +
//       1000 * 60 * 60 * 12 -
//       (GRAPH_ENTRIES - index) * (1000 * 60 * 60 * 24),
//     value: Math.random() * 10000
//   }))
// }

const Volume: React.FC<StatsInterface> = ({
  volume,
  data,
  className,
  isLoading,
  interval,
  lastStatsTimestamp
}) => {
  const { classes, cx } = useStyles()

  volume = volume ?? 0

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const Theme = {
    axis: {
      fontSize: '14px',
      tickColor: 'transparent',
      ticks: { line: { stroke: colors.invariant.component }, text: { fill: '#A9B6BF' } },
      legend: { text: { stroke: 'transparent' } }
    },
    grid: { line: { stroke: colors.invariant.light } }
  }

  return (
    <Grid className={cx(classes.container, className)}>
      <Box className={classes.volumeContainer}>
        <Grid container justifyContent={'space-between'} alignItems='center'>
          <Typography className={classes.volumeHeader}>Volume</Typography>
        </Grid>
        <div className={classes.volumePercentContainer}>
          <Typography className={classes.volumePercentHeader}>
            ${formatNumberWithoutSuffix(isLoading ? Math.random() * 10000 : volume)}
          </Typography>
        </div>
      </Box>
      <div className={classes.barContainer}>
        <ResponsiveBar
          layout='vertical'
          key={`${interval}-${isLoading}`}
          animate={false}
          margin={{ top: 30, bottom: 30, left: 30, right: 4 }}
          data={data as Array<{ timestamp: number; value: number }>}
          keys={['value']}
          indexBy='timestamp'
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            format: time =>
              isLoading ? '' : formatPlotDataLabels(time, data.length, interval, isMobile)
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 2,
            tickRotation: 0,
            tickValues: 5,
            renderTick: isLoading
              ? () => <text></text>
              : ({ x, y, value }) => (
                  <g transform={`translate(${x - (isMobile ? 22 : 30)},${y + 4})`}>
                    {' '}
                    <text
                      style={{ fill: colors.invariant.textGrey, ...typography.tiny2 }}
                      textAnchor='start'
                      dominantBaseline='center'>
                      {trimZeros(formatLargeNumber(value))}
                    </text>
                  </g>
                )
          }}
          gridYValues={5}
          theme={Theme}
          groupMode='grouped'
          enableLabel={false}
          enableGridY={true}
          innerPadding={isXsDown ? 1 : 2}
          isInteractive
          padding={0.03}
          indexScale={{ type: 'band', round: true }}
          defs={[
            linearGradientDef('gradient', [
              { offset: 0, color: '#EF84F5' },
              { offset: 100, color: '#9C3EBD', opacity: 0.8 }
            ])
          ]}
          fill={[{ match: '*', id: 'gradient' }]}
          colors={colors.invariant.pink}
          tooltip={({ data }) => {
            const date = getLabelDate(interval, data.timestamp, lastStatsTimestamp)

            return (
              <Grid className={classes.tooltip}>
                <Typography className={classes.tooltipDate}>{date}</Typography>
                <Typography className={classes.tooltipValue}>
                  ${formatNumberWithoutSuffix(data.value)}
                </Typography>
              </Grid>
            )
          }}
        />
      </div>
    </Grid>
  )
}

export default Volume
