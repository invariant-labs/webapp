import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'
import classNames from 'classnames'
import { colors, typography } from '@static/theme'
import { useStyles } from './style'
import { TimeData } from '@store/reducers/stats'
import { Grid, Typography } from '@mui/material'
import { formatNumber, trimZeros } from '@utils/utils'
import { formatLargeNumber } from '@utils/formatLargeNumber'

interface LiquidityInterface {
  liquidityPercent: number | null
  liquidityVolume: number | null
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

const Liquidity: React.FC<LiquidityInterface> = ({
  liquidityPercent,
  liquidityVolume,
  data,
  className,
  isLoading
}) => {
  const { classes } = useStyles()

  liquidityPercent = liquidityPercent ?? 0
  liquidityVolume = liquidityVolume ?? 0

  const isLower = liquidityPercent < 0
  const percentage = isLoading ? Math.random() * 200 - 100 : liquidityPercent

  return (
    <Grid
      className={classNames(classes.container, className, { [classes.loadingOverlay]: isLoading })}>
      <Grid className={classes.liquidityContainer}>
        <Typography className={classes.liquidityHeader}>Liquidity</Typography>
        <Grid className={classes.volumePercentHeader}>
          <Typography className={classes.volumeLiquidityHeader}>
            ${formatNumber(isLoading ? Math.random() * 10000 : liquidityVolume)}
          </Typography>
          <Grid className={classes.volumeStatusContainer}>
            <Grid
              className={classNames(
                classes.volumeStatusColor,
                isLower ? classes.backgroundVolumeLow : classes.backgroundVolumeUp
              )}>
              <Typography
                component='p'
                className={classNames(
                  classes.volumeStatusHeader,
                  isLower ? classes.volumeLow : classes.volumeUp
                )}>
                {percentage < 0 ? percentage.toFixed(2) : `+${percentage.toFixed(2)}`}%
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.barContainer}>
        <ResponsiveLine
          data={[
            {
              id: 'liquidity',
              data: data.map(({ timestamp, value }) => ({
                x: new Date(timestamp).toLocaleDateString('en-GB'),
                y: value
              }))
            }
          ]}
          margin={{ top: 24, bottom: 24, left: 30, right: 24 }}
          xScale={{
            type: 'time',
            format: '%d/%m/%Y',
            precision: 'day',
            useUTC: false
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            tickValues:
              data.length >= 24 ? 'every 4 days' : data.length >= 8 ? 'every 2 days' : 'every day',
            format: '%d/%m'
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 2,
            tickRotation: 0,
            tickValues: 5,
            renderTick: ({ x, y, value }) => (
              <g transform={`translate(${x - 30},${y + 4})`}>
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
          legends={[]}
          axisTop={null}
          axisRight={null}
          curve={'monotoneX'}
          role='aplication'
          enableGridX={false}
          enableGridY={true}
          enablePoints={false}
          enableArea={true}
          isInteractive
          useMesh
          animate
          colors={colors.invariant.green}
          theme={{
            axis: {
              ticks: {
                line: { stroke: colors.invariant.component },
                text: { fill: '#A9B6BF' }
              }
            },
            crosshair: {
              line: {
                stroke: colors.invariant.lightGrey,
                strokeWidth: 1,
                strokeDasharray: 'solid'
              }
            },
            grid: { line: { stroke: colors.invariant.light } }
          }}
          lineWidth={1}
          defs={[
            linearGradientDef('gradient', [
              { offset: 0, color: 'inherit' },
              { offset: 50, color: 'inherit' },
              { offset: 100, color: 'inherit', opacity: 0 }
            ])
          ]}
          fill={[{ match: '*', id: 'gradient' }]}
          crosshairType='bottom'
          tooltip={({ point }) => {
            const date = point.data.x as Date
            const day = date.getDate()
            const month = date.getMonth() + 1

            return (
              <Grid className={classes.tooltip}>
                <Typography className={classes.tooltipDate}>{`${day < 10 ? '0' : ''}${day}/${
                  month < 10 ? '0' : ''
                }${month}`}</Typography>
                <Typography className={classes.tooltipValue}>
                  ${formatNumber(point.data.y as number)}
                </Typography>
              </Grid>
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default Liquidity
