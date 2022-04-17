import React, { useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
// @ts-expect-error
import { linearGradientDef } from '@nivo/core'
import { formatNumbers, showPrefix } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { colors } from '@static/theme'
import { TimeData } from '@reducers/stats'
import { useStyles } from './style'

interface IPlot {
  liquidityPercent: number
  liquidityVolume: number
  data: TimeData[]
  className?: string
  rate?: number
  currencyType: string
}

const Plot: React.FC<IPlot> = ({
  liquidityPercent,
  liquidityVolume,
  data,
  className,
  rate,
  currencyType
}) => {
  const classes = useStyles()
  const isLower = liquidityPercent < 0
  const dateAndHours = data.map(({ timestamp, value }) => {
    return {
      x:
        new Date(timestamp).toLocaleDateString('en-GB') +
        'T' +
        new Date(timestamp).getHours().toString(),
      y: rate ? value * rate : value
    }
  })

  console.log(dateAndHours, data)

  return (
    <Grid className={classNames(classes.container, className)}>
      <Grid className={classes.liquidityContainer}>
        <Grid className={classes.volumePercentHeader}>
          <Typography variant={'h4'} className={classes.volumeLiquidityHeader}>
            <Typography variant={'caption'} className={classes.volumeLiquidityHeaderInner}>
              {currencyType ? currencyType + ':' : ''}
            </Typography>
            ${formatNumbers()(liquidityVolume.toString())}
            {showPrefix(liquidityVolume)}
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
                {liquidityPercent < 0
                  ? liquidityPercent.toFixed(2)
                  : `+${liquidityPercent.toFixed(2)}`}
                %
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
              data: dateAndHours
            }
          ]}
          margin={{ left: 0, bottom: 24, top: 12 }}
          xScale={{
            type: 'time',
            format: '%d/%m/%YT%H',
            precision: 'hour'
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 6.6,
            tickRotation: 0,
            format: timestampParam => {
              const hour = new Date(timestampParam).getHours()

              return hour >= 12 && hour < 24
                ? (hour % 12).toString() + 'PM'
                : (hour % 12).toString() + 'AM'
            },
            tickValues: 4
          }}
          legends={[]}
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          curve={'monotoneX'}
          role={'application'}
          enableGridX={false}
          enableGridY={false}
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
                text: {
                  fill: '#A9B6BF',
                  fontWeight: 400,
                  fontSize: 10,
                  lineHeight: '13px'
                }
              }
            },
            crosshair: {
              line: {
                stroke: colors.invariant.lightGrey,
                strokeWidth: 1,
                strokeDasharray: 'solid'
              }
            }
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
            const hour = date.getHours()

            return (
              <Grid className={classes.tooltip}>
                <Typography className={classes.tooltipDate}>{`${
                  hour > 12 ? hour + 'PM' : hour + 'AM'
                }`}</Typography>
                <Typography className={classes.tooltipValue}>
                  ${(point.data.y as number).toFixed(2)}
                </Typography>
              </Grid>
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default Plot
