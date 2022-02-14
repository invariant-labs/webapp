import React from 'react'
import { ResponsiveLine } from '@nivo/line'
// @ts-expect-error
import { linearGradientDef } from '@nivo/core'
import { formatNumbers, showPrefix } from '@consts/utils'
import { Grid, Box, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import classNames from 'classnames'
import { colors } from '@static/theme'

interface LiquidityInterface {
  liquidityPercent: number
  liquidityVolume: number

  positions: Array<{
    id: string
    data: Array<{
      x: string
      y: number
    }>
  }>
}

const Liquidity: React.FC<LiquidityInterface> = ({
  liquidityPercent,
  liquidityVolume,
  positions
}) => {
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

  return (
    <Grid className={classes.container}>
      <Box className={classes.liquidityContainer}>
        <Typography className={classes.liquidityHeader}>Liquidity 24H</Typography>
        <div className={classes.volumePercentHeader}>
          <Typography className={classes.volumeLiquidityHeader}>
            ${formatNumbers()(liquidityVolume.toString())}
            {showPrefix(liquidityVolume)}
          </Typography>
          <Box className={classes.volumeStatusContainer}>
            <Box
              className={classNames(
                classes.volumeStatusColor,
                liquidityPercent < 0 ? classes.backgroundVolumeLow : classes.backgroundVolumeUp
              )}>
              <Typography
                component='p'
                className={classNames(
                  classes.volumeStatusHeader,
                  liquidityPercent < 0 ? classes.volumeLow : classes.volumeUp
                )}>
                {liquidityPercent < 0
                  ? `-${liquidityPercent.toString().split('-')[1]}`
                  : `+ ${liquidityPercent}`}
                %
              </Typography>
            </Box>
          </Box>
        </div>
      </Box>
      <div className={classes.barContainer}>
        <ResponsiveLine
          data={positions}
          margin={{ top: 30, bottom: 20, left: 10, right: 20 }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            tickValues: 5
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
      </div>
    </Grid>
  )
}

export default Liquidity
