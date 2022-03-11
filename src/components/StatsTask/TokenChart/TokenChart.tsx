import React from 'react'
import { ResponsiveLine } from '@nivo/line'
// @ts-expect-error
import { linearGradientDef } from '@nivo/core'
import { Grid, Box, Typography } from '@material-ui/core'
import { colors } from '@static/theme'
import useStyles from './style'
import { formatNumbers, showPrefix } from '@consts/utils'
import classNames from 'classnames'

interface TokenChartInterface {
  TokenPercent: number
  TokenVolume: number

  positions: Array<{
    id: string
    data: Array<{
      x: string
      y: number
    }>
  }>
}

const TokenChart: React.FC<TokenChartInterface> = ({ TokenPercent, TokenVolume, positions }) => {
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
  const isLower = TokenPercent < 0
  const axisKeys = positions.map(({ data }) => data.map(({ x }) => x))
  const reduceArray = axisKeys.reduce((array, isArray) =>
    Array.isArray(isArray) ? array.concat(isArray) : array
  )

  return (
    <Grid className={classes.container}>
      <Box className={classes.tokenContainer}>
        <Typography className={classes.tokenHeader}>Token Chart</Typography>
        <div className={classes.volumePercentHeader}>
          <Typography className={classes.volumeTokenHeader}>SNY:</Typography>
          <Typography className={classes.volumeTokenUSD}>
            ${formatNumbers()(TokenVolume.toString())}
            {showPrefix(TokenVolume)}
          </Typography>
          <Box className={classes.volumeStatusContainer}>
            <Box
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
                {TokenPercent < 0
                  ? `-${TokenPercent.toString().split('-')[1]}`
                  : `+ ${TokenPercent}`}
                %
              </Typography>
            </Box>
          </Box>
        </div>
      </Box>
      <Grid className={classes.ChartContainer}>
        <ResponsiveLine
          data={positions}
          margin={{ bottom: 6.6, left: 16, right: 16 }}
          axisBottom={null}
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
          fill={[{ match: '*', id: 'gradient' }]}></ResponsiveLine>
      </Grid>
      <Box className={classes.axisKeys}>
        {reduceArray.map((keyLine, i) => (
          <Typography key={i} className={classes.axisKey}>
            {keyLine}
          </Typography>
        ))}
      </Box>
    </Grid>
  )
}

export default TokenChart
