import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { formatNumbers, showPrefix } from '@consts/utils'
import { Grid, Box, Typography } from '@material-ui/core'
import classNames from 'classnames'
import { colors } from '@static/theme'
import { useStyles } from './style'

export interface TokenChartInterface {
  percentChart: number
  volumeChart: number
  positions: Array<{
    id: string
    data: Array<{
      x: string
      y: number
    }>
  }>
}

export const TokenChart: React.FC<TokenChartInterface> = ({
  percentChart,
  volumeChart,
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
  const isLower = percentChart < 0
  const lineKey = positions.map(({ data }) => data.map(({ x }) => x))
  const reduceArray = lineKey.reduce((array, isArray) =>
    Array.isArray(isArray) ? array.concat(isArray) : array
  )
  return (
    <Grid className={classes.container}>
      <Box className={classes.chartContainer}>
        <Typography className={classes.chartHeader}>Token Chart</Typography>
        <div className={classes.tokenPercentHeader}>
          <Typography className={classes.tokenChartHeader}>
            SNY: ${formatNumbers()(volumeChart.toString())}
            {showPrefix(volumeChart)}
          </Typography>
          <Box className={classes.tokenStatusContainer}>
            <Box
              className={classNames(
                classes.tokenStatusColor,
                isLower ? classes.backgroundTokenLow : classes.backgroundTokenUp
              )}>
              <Typography
                component='a'
                className={classNames(
                  classes.tokenStatusHeader,
                  isLower ? classes.tokenLow : classes.tokenUp
                )}>
                {percentChart < 0 ? `${percentChart.toString()}` : `+ ${percentChart}`}%
              </Typography>
            </Box>
          </Box>
        </div>
      </Box>
      <div className={classes.barContainer}>
        <ResponsiveLine
          data={positions}
          margin={{ top: 20, right: 30, bottom: 10, left: 20 }}
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
          fill={[{ match: '*', id: 'gradient' }]}></ResponsiveLine>
      </div>
      <Box className={classes.LineKeys}>
        {reduceArray.map((keyLine, i) => (
          <Typography key={i} className={classes.keyPTag}>
            {keyLine}
          </Typography>
        ))}
      </Box>
    </Grid>
  )
}

export default TokenChart
