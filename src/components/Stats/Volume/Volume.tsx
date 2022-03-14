import React from 'react'
import { Grid, Typography, Box, useMediaQuery } from '@material-ui/core'
import { formatNumbers, showPrefix } from '@consts/utils'
import { ResponsiveBar } from '@nivo/bar'
import classNames from 'classnames'
import { useStyles } from './style'
import { colors, theme } from '@static/theme'
import { TimeData } from '@reducers/stats'

interface StatsInterface {
  percentVolume: number
  volume: number
  data: TimeData[]
}

const Volume: React.FC<StatsInterface> = ({ percentVolume, volume, data }) => {
  const classes = useStyles()

  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))

  const cutArray = (arr: Array<{ timeStamp: string; value: number[] }>, size: number) => {
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

  const converToUnix = data.map(el => {
    const unix = el.timestamp
    const date = new Date(unix)
    const hours = date.getHours()

    const convertedHour = hours >= 13 ? `${hours - 12}PM` : `${hours}AM`

    return { ...el, timeStamp: convertedHour }
  })

  const sortedByTimeStamp = converToUnix.reduce((map, { timeStamp, value }) => {
    if (!map.has(timeStamp)) return map.set(timeStamp, [value])

    map.get(timeStamp).push(value)

    return map
  }, new Map())

  const convertedArray: Array<{ timeStamp: string; value: number[] }> = Array.from(
    sortedByTimeStamp,
    ([timeStamp, value]) => ({ timeStamp, value })
  )

  const barDataContent = cutArray(convertedArray, 3)

  const barData: Array<{ timeStamp: string; [key: number]: number }> = barDataContent.map(el => {
    const timeStamp = el[0].timeStamp

    const concatValues = concatArray(el.map(({ value }) => value))

    const convert = Object.assign({}, concatValues)
    return { timeStamp, ...convert }
  })

  const keys = barData.map(({ timeStamp, ...rest }) => Object.keys(rest))

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
    <Grid className={classes.container}>
      <Box className={classes.volumeContainer}>
        <Typography className={classes.volumeHeader}>Volume 24H</Typography>
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
                {percentVolume < 0
                  ? percentVolume
                  : `+${percentVolume}`}
                %
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
          indexBy='timeStamp'
          labelSkipWidth={2}
          labelSkipHeight={12}
          theme={Theme}
          groupMode='grouped'
          enableLabel={false}
          enableGridY={false}
          innerPadding={isXsDown ? 1 : 2}
          isInteractive={false}
          padding={0.03}
          indexScale={{ type: 'band', round: true }}
          colors={colors.invariant.pink}
        />
      </div>
    </Grid>
  )
}

export default Volume
