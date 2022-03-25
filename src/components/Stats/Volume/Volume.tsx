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
  data: TimeData[],
  className?: string
}

const Volume: React.FC<StatsInterface> = ({ percentVolume, volume, data, className }) => {
  const classes = useStyles()

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))

  const cutArray = (arr: Array<{ timestamp: string; value: number[] }>, size: number) => {
    const arrData = arr.slice(0)
    const result = []

    while (arrData.length > 0) result.push(arrData.splice(0, size))

    return result
  }

  function concatArray<T>(arr: T[][]) {
    return arr.reduce(
      (array, isArray) => (Array.isArray(isArray) ? array.concat(isArray) : array),
      []
    )
  }

  const sortedByTimeStamp = data.reduce((map, { timestamp, value }) => {
    if (!map.has(timestamp)) return map.set(timestamp, [value])

    map.get(timestamp).push(value)

    return map
  }, new Map())

  const convertedArray: Array<{ timestamp: string; value: number[] }> = Array.from(
    sortedByTimeStamp,
    ([timestamp, value]) => ({ timestamp, value })
  )

  const barDataContent = cutArray(convertedArray, 1)

  const barData: Array<{ timestamp: string; [key: number]: number }> = barDataContent.map(el => {
    const timestamp = el[0].timestamp

    const concatValues = concatArray(el.map(({ value }) => value))

    const convert = Object.assign({}, concatValues)
    return { timestamp, ...convert }
  })

  const keys = barData.map(({ timestamp, ...rest }) => Object.keys(rest))

  const uniqueKeys = [...new Set(concatArray(keys))]

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
          data={barData}
          keys={uniqueKeys}
          indexBy='timestamp'
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            format: time => {
              const date = new Date(time)
              const day = date.getDate()
              const month = date.getMonth() + 1

              const dayMod = Math.floor(time / (1000 * 60 * 60 * 24)) % (data.length >= 25 ? 4 : data.length >= 10 ? 2 : 1)

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
          isInteractive={false}
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
        />
      </div>
    </Grid>
  )
}

export default Volume
