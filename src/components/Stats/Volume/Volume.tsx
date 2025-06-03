import { ResponsiveBar } from '@nivo/bar'
import { colors, theme, typography } from '@static/theme'
import { linearGradientDef } from '@nivo/core'
import { useStyles } from './style'
import { TimeData } from '@store/reducers/stats'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { formatNumberWithoutSuffix, trimZeros } from '@utils/utils'
import { formatLargeNumber } from '@utils/formatLargeNumber'

interface StatsInterface {
  percentVolume: number | null
  volume: number | null
  data: TimeData[]
  className?: string
  isLoading: boolean
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
  percentVolume,
  volume,
  data,
  className,
  isLoading
}) => {
  const { classes, cx } = useStyles()

  percentVolume = percentVolume ?? 0
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

  const isLower = percentVolume < 0
  const percentage = isLoading ? Math.random() * 200 - 100 : percentVolume

  return (
    <Grid className={cx(classes.container, className)}>
      <Box className={classes.volumeContainer}>
        <Typography className={classes.volumeHeader}>Volume</Typography>
        <div className={classes.volumePercentContainer}>
          <Typography className={classes.volumePercentHeader}>
            ${formatNumberWithoutSuffix(isLoading ? Math.random() * 10000 : volume)}
          </Typography>
          <Box className={classes.volumeStatusContainer}>
            <Box
              className={cx(
                classes.volumeStatusColor,
                isLower ? classes.backgroundVolumeLow : classes.backgroundVolumeUp
              )}>
              <Typography
                component='p'
                className={cx(
                  classes.volumeStatusHeader,
                  isLower ? classes.volumeLow : classes.volumeUp
                )}>
                {percentage < 0 ? percentage.toFixed(2) : `+${percentage.toFixed(2)}`}%
              </Typography>
            </Box>
          </Box>
        </div>
      </Box>
      <div className={classes.barContainer}>
        <ResponsiveBar
          margin={{ top: 30, bottom: 30, left: 30 }}
          data={data as Array<{ timestamp: number; value: number }>}
          keys={['value']}
          indexBy='timestamp'
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            format: time => {
              const date = new Date(time)
              const day = date.getDate()
              const month = date.getMonth() + 1

              const dayMod =
                Math.floor(time / (1000 * 60 * 60 * 24)) %
                (data.length >= 24 ? 4 : data.length >= 8 ? 2 : 1)

              return dayMod === 0
                ? `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}`
                : ''
            }
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 2,
            tickRotation: 0,
            tickValues: 5,
            renderTick: ({ x, y, value }) => (
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
            const date = new Date(data.timestamp)
            const day = date.getDate()
            const month = date.getMonth() + 1

            return (
              <Grid className={classes.tooltip}>
                <Typography className={classes.tooltipDate}>{`${day < 10 ? '0' : ''}${day}/${
                  month < 10 ? '0' : ''
                }${month}`}</Typography>
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
