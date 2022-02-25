import React from 'react'
import { Grid, Typography, Box, useMediaQuery } from '@material-ui/core'
import useStyle from './style'
import classNames from 'classnames'
import { formatNumbers, showPrefix } from '@consts/utils'
import { theme } from '@static/theme'

interface Iprops {
  percentVolume: string
  volume: string
  tvlVolume: string
  percentTvl: string
  feesVolume: string
  percentFees: string
}

const VolumeBar: React.FC<Iprops> = ({
  percentVolume,
  volume,
  tvlVolume,
  percentTvl,
  feesVolume,
  percentFees
}) => {
  const classes = useStyle()

  const isXDown = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Grid container classes={{ container: classes.container }}>
      <Box className={classes.tokenName}>
        <Typography className={classes.tokenHeader}>Volume24H:</Typography>
        <Typography className={classes.tokenContent}>
          {formatNumbers()(volume)}
          {showPrefix(Number(volume))}
        </Typography>
        {!isXDown && (
          <Typography
            className={classNames(
              classes.tokenContent,
              Number(percentVolume) < 0 ? classes.tokenLow : classes.tokenUp
            )}>
            {Number(percentVolume) < 0 ? `(${percentVolume}%)` : `(+${percentVolume}%)`}
          </Typography>
        )}
      </Box>
      <Box className={classes.tokenName}>
        <Typography className={classes.tokenHeader}>TVL 24H:</Typography>
        <Typography className={classes.tokenContent}>
          {formatNumbers()(tvlVolume)}
          {showPrefix(Number(tvlVolume))}
        </Typography>
        {!isXDown && (
          <Typography
            className={classNames(
              classes.tokenContent,
              Number(percentTvl) < 0 ? classes.tokenLow : classes.tokenUp
            )}>
            {Number(percentTvl) < 0 ? `(${percentTvl}%)` : `(+${percentTvl}%)`}
          </Typography>
        )}
      </Box>
      <Box className={classes.tokenName}>
        <Typography className={classes.tokenHeader}>Fees 24H:</Typography>
        <Typography className={classes.tokenContent}>
          {formatNumbers()(feesVolume)}
          {showPrefix(Number(feesVolume))}
        </Typography>
        {!isXDown && (
          <Typography
            className={classNames(
              classes.tokenContent,
              Number(percentFees) < 0 ? classes.tokenLow : classes.tokenUp
            )}>
            {Number(percentFees) < 0 ? `(${percentFees}%)` : `(+${percentFees}%)`}
          </Typography>
        )}
      </Box>
    </Grid>
  )
}

export default VolumeBar
