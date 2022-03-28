import React from 'react'
import { Grid, Typography, Box, useMediaQuery } from '@material-ui/core'
import { formatNumbers, showPrefix } from '@consts/utils'
import { ResponsiveBar } from '@nivo/bar'
import classNames from 'classnames'
import { colors, theme } from '@static/theme'
import { TimeData } from '@reducers/stats'
// @ts-expect-error
import { linearGradientDef } from '@nivo/core'
import { useStyles } from './style'

interface StatsInterface {
  percentVolume: number
  volume: number
  data: TimeData[]
  className?: string
}

const Volume: React.FC<StatsInterface> = ({ percentVolume, volume, data, className }) => {
  const classes = useStyles()

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))

  const Theme = {
    axis: {
      fontSize: '14px',
      tickColor: 'transparent',
      ticks: { line: { stroke: colors.invariant.component }, text: { fill: '#A9B6BF' } },
      legend: { text: { stroke: 'transparent' } }
    },
    grid: { line: { stroke: 'transparent' } }
  }

  const isLower = percentVolume < 0

  console.log(data)

  return (
    <Grid className={classNames(classes.container, className)}>
      <Box className={classes.volumeContainer}>
        <Typography className={classes.volumeHeader}>Volume</Typography>
        <div className={classes.volumePercentContainer}>
          <Typography className={classes.volumePercentHeader}>
            ${formatNumbers()(volume.toString())}
            {showPrefix(volume)}
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
                {percentVolume < 0 ? percentVolume.toFixed(2) : `+${percentVolume.toFixed(2)}`}%
              </Typography>
            </Box>
          </Box>
        </div>
      </Box>
      <div className={classes.barContainer}>
        <ResponsiveBar
          margin={{ top: 30, bottom: 30, left: 0 }}
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
          theme={Theme}
          groupMode='grouped'
          enableLabel={false}
          enableGridY={false}
          innerPadding={isXsDown ? 1 : 2}
          isInteractive
          padding={0.03}
          indexScale={{ type: 'band', round: true }}
          defs={[
            linearGradientDef('gradient', [
              { offset: 0, color: '#EF84F5' },
              { offset: 100, color: '#9C3EBD', opacity: 0.7 }
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
                <Typography className={classes.tooltipValue}>${data.value.toFixed(2)}</Typography>
              </Grid>
            )
          }}
        />
      </div>
    </Grid>
  )
}

export default Volume
