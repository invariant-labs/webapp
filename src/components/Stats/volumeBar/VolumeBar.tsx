import React from 'react'
import { theme } from '@static/theme'
import { useStyles } from './style'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { formatNumberWithSuffix } from '@utils/utils'
import { Intervals } from '@store/consts/static'
import { mapIntervalToString } from '@utils/uiUtils'

interface Iprops {
  percentVolume: number | null
  volume: number | null
  tvlVolume: number | null
  percentTvl: number | null
  feesVolume: number | null
  percentFees: number | null
  isLoading: boolean
  interval: Intervals
}

const VolumeBar: React.FC<Iprops> = ({
  percentVolume,
  volume,
  tvlVolume,
  percentTvl,
  feesVolume,
  percentFees,
  isLoading,
  interval
}) => {
  const { classes, cx } = useStyles()

  percentVolume = percentVolume ?? 0
  volume = volume ?? 0
  tvlVolume = tvlVolume ?? 0
  percentTvl = percentTvl ?? 0
  feesVolume = feesVolume ?? 0
  percentFees = percentFees ?? 0

  const volumePercentage = isLoading ? Math.random() * 200 - 100 : percentVolume
  const tvlPercentage = isLoading ? Math.random() * 200 - 100 : percentTvl
  const feesPercentage = isLoading ? Math.random() * 200 - 100 : percentFees
  const intervalSuffix = mapIntervalToString(interval)
  const isXDown = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Grid
      container
      classes={{ container: classes.container }}
      className={cx({ [classes.loadingOverlay]: isLoading })}>
      <Box className={classes.tokenName}>
        <Typography className={classes.tokenHeader}>Volume {intervalSuffix}:</Typography>

        <Typography className={classes.tokenContent}>
          ${formatNumberWithSuffix(isLoading ? Math.random() * 10000 : volume)}
        </Typography>
        {!isXDown && (
          <Typography
            className={cx(
              classes.tokenContent,
              volumePercentage < 0 ? classes.tokenLow : classes.tokenUp
            )}>
            {volumePercentage < 0
              ? `(${volumePercentage.toFixed(2)}%)`
              : `(+${volumePercentage.toFixed(2)}%)`}
          </Typography>
        )}
      </Box>
      <Box className={classes.tokenName}>
        <Typography className={classes.tokenHeader}>TVL {intervalSuffix}:</Typography>

        <Typography className={classes.tokenContent}>
          ${formatNumberWithSuffix(isLoading ? Math.random() * 10000 : tvlVolume)}
        </Typography>
        {!isXDown && (
          <Typography
            className={cx(
              classes.tokenContent,
              tvlPercentage < 0 ? classes.tokenLow : classes.tokenUp
            )}>
            {tvlPercentage < 0
              ? `(${tvlPercentage.toFixed(2)}%)`
              : `(+${tvlPercentage.toFixed(2)}%)`}
          </Typography>
        )}
      </Box>

      <Box className={classes.tokenName}>
        <Typography className={classes.tokenHeader}>Fees {intervalSuffix}:</Typography>
        <Typography className={classes.tokenContent}>
          ${formatNumberWithSuffix(isLoading ? Math.random() * 1000 : feesVolume)}
        </Typography>
        {!isXDown && (
          <Typography
            className={cx(
              classes.tokenContent,
              feesPercentage < 0 ? classes.tokenLow : classes.tokenUp
            )}>
            {feesPercentage < 0
              ? `(${feesPercentage.toFixed(2)}%)`
              : `(+${feesPercentage.toFixed(2)}%)`}
          </Typography>
        )}
      </Box>
    </Grid>
  )
}

export default VolumeBar
