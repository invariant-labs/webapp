import { Grid, Hidden, Typography, useMediaQuery } from '@material-ui/core'
import React, { useMemo } from 'react'
import icons from '@static/icons'
import { ILiquidityItem } from '../PositionsList'
import { formatNumbers, FormatNumberThreshold, PrefixConfig, showPrefix } from '@consts/utils'
import { theme } from '@static/theme'
import useStyle from './style'

const shorterThresholds: FormatNumberThreshold[] = [
  {
    value: 100,
    decimals: 2
  },
  {
    value: 1000,
    decimals: 1
  },
  {
    value: 10000,
    decimals: 1,
    divider: 1000
  },
  {
    value: 1000000,
    decimals: 0,
    divider: 1000
  },
  {
    value: 10000000,
    decimals: 1,
    divider: 1000000
  },
  {
    value: 1000000000,
    decimals: 0,
    divider: 1000000
  },
  {
    value: 10000000000,
    decimals: 1,
    divider: 1000000000
  }
]

const minMaxShorterThresholds: FormatNumberThreshold[] = [
  {
    value: 10,
    decimals: 3
  },
  ...shorterThresholds
]

const shorterPrefixConfig: PrefixConfig = {
  B: 1000000000,
  M: 1000000,
  K: 1000
}

export const PositionItem: React.FC<ILiquidityItem> = ({
  tokenXName,
  tokenYName,
  tokenXIcon,
  tokenYIcon,
  tokenXLiq,
  tokenYLiq,
  fee,
  min,
  max,
  value
}) => {
  const classes = useStyle()

  const isXs = useMediaQuery(theme.breakpoints.down('xs'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  const feeFragment = useMemo(
    () => (
      <Grid container item className={classes.fee} justifyContent='center' alignItems='center'>
        <Typography className={classes.infoText}>{fee}% fee</Typography>
      </Grid>
    ),
    [fee, classes]
  )

  const valueFragment = useMemo(
    () => (
      <Grid
        container
        item
        className={classes.value}
        justifyContent='space-between'
        alignItems='center'
        wrap='nowrap'>
        <Typography className={classes.infoText}>Value</Typography>
        <Grid className={classes.infoCenter} container item justifyContent='center'>
          <Typography className={classes.greenText}>
            {formatNumbers(isXs || isDesktop ? shorterThresholds : undefined)(value.toString())}
            {showPrefix(value, isXs || isDesktop ? shorterPrefixConfig : undefined)} {tokenXName}
          </Typography>
        </Grid>
      </Grid>
    ),
    [value, tokenXName, classes, isXs, isDesktop]
  )

  return (
    <Grid
      className={classes.root}
      container
      direction='row'
      alignItems='center'
      justifyContent='space-between'>
      <Grid container item className={classes.mdTop} direction='row' wrap='nowrap'>
        <Grid container item className={classes.iconsAndNames} alignItems='center' wrap='nowrap'>
          <Grid container item className={classes.icons} alignItems='center' wrap='nowrap'>
            <img className={classes.tokenIcon} src={tokenXIcon} alt={tokenXName} />
            <img className={classes.arrows} src={icons.ArrowIcon} alt='Arrow' />
            <img className={classes.tokenIcon} src={tokenYIcon} alt={tokenYName} />
          </Grid>

          <Typography className={classes.names}>
            {tokenXName} - {tokenYName}
          </Typography>
        </Grid>

        <Hidden mdUp>{feeFragment}</Hidden>
      </Grid>

      <Grid container item className={classes.mdInfo} direction='row'>
        <Grid
          container
          item
          className={classes.liquidity}
          justifyContent='center'
          alignItems='center'>
          <Typography className={classes.infoText}>
            {formatNumbers(isXs || isDesktop ? shorterThresholds : undefined)(tokenXLiq.toString())}
            {showPrefix(tokenXLiq, isXs || isDesktop ? shorterPrefixConfig : undefined)}{' '}
            {tokenXName}
            {' - '}
            {formatNumbers(isXs || isDesktop ? shorterThresholds : undefined)(tokenYLiq.toString())}
            {showPrefix(tokenYLiq, isXs || isDesktop ? shorterPrefixConfig : undefined)}{' '}
            {tokenYName}
          </Typography>
        </Grid>

        <Hidden smDown>{feeFragment}</Hidden>

        <Hidden mdUp>{valueFragment}</Hidden>

        <Grid
          container
          item
          className={classes.minMax}
          justifyContent='space-between'
          alignItems='center'
          wrap='nowrap'>
          <Typography className={classes.greenText}>MIN - MAX</Typography>
          <Grid className={classes.infoCenter} container item justifyContent='center'>
            <Typography className={classes.infoText}>
              {formatNumbers(isXs || isDesktop ? minMaxShorterThresholds : undefined)(
                min.toString()
              )}
              {showPrefix(min, isXs || isDesktop ? shorterPrefixConfig : undefined)}
              {' - '}
              {formatNumbers(isXs || isDesktop ? minMaxShorterThresholds : undefined)(
                max.toString()
              )}
              {showPrefix(max, isXs || isDesktop ? shorterPrefixConfig : undefined)} {tokenYName}{' '}
              per {tokenXName}
            </Typography>
          </Grid>
        </Grid>

        <Hidden smDown>{valueFragment}</Hidden>
      </Grid>
    </Grid>
  )
}
