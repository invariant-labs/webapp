import React from 'react'
import { ResponsiveLine } from '@nivo/line'
// @ts-expect-error
import { linearGradientDef } from '@nivo/core'
import { formatNumbers, showPrefix } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './style'
import classNames from 'classnames'
import { colors } from '@static/theme'
import { TimeData } from '@reducers/stats'

interface LiquidityInterface {
  liquidityPercent: number
  liquidityVolume: number
  data: TimeData[]
}

const Liquidity: React.FC<LiquidityInterface> = ({ liquidityPercent, liquidityVolume, data }) => {
  const classes = useStyles()

  const Theme = {
    axis: {
      tickColor: 'transparent',
      ticks: {
        line: { stroke: colors.invariant.component },
        text: { fill: '#A9B6BF' }
      }
    }
  }

  const isLower = liquidityPercent < 0

  return (
    <Grid className={classes.container}>
      <Grid className={classes.liquidityContainer}>
        <Typography className={classes.liquidityHeader}>Liquidity 24H</Typography>
        <Grid className={classes.volumePercentHeader}>
          <Typography className={classes.volumeLiquidityHeader}>
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
              data: data.map(({ timestamp, value }) => ({
                x: new Date(timestamp),
                y: value
              }))
            }
          ]}
          margin={{ top: 24, bottom: 24, left: 24, right: 24 }}
          xScale={{
            type: 'time',
            format: 'native',
            precision: 'day',
            useUTC: true
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            tickValues: data.length >= 25 ? 'every 4 days' : data.length >= 10 ? 'every 2 days' : 'every day',
            format: '%d/%m'
          }}
          legends={[]}
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          curve={'monotoneX'}
          role='aplication'
          enableGridX={false}
          enableGridY={false}
          enablePoints={false}
          enableArea={true}
          isInteractive={false}
          animate={false}
          colors={colors.invariant.green}
          theme={Theme}
          lineWidth={1}
          defs={[
            linearGradientDef('gradient', [
              { offset: 0, color: 'inherit' },
              { offset: 50, color: 'inherit' },
              { offset: 100, color: 'inherit', opacity: 0 }
            ])
          ]}
          fill={[{ match: '*', id: 'gradient' }]}
        />
      </Grid>
    </Grid>
  )
}

export default Liquidity
