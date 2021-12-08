import { Grid, Hidden, Typography } from '@material-ui/core'
import React, { useMemo } from 'react'
import icons from '@static/icons'
import useStyle from './style'

interface ILiquidityItem {
  tokenXName: string
  tokenYName: string
  tokenXIcon: string
  tokenYIcon: string
  tokenXLiq: number
  tokenYLiq: number
  fee: number
  min: number
  max: number
  value: number
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

  const feeFragment = useMemo(() => (
    <Grid container item className={classes.fee} justifyContent='center' alignItems='center'>
      <Typography className={classes.infoText}>
        {fee}% fee
      </Typography>
    </Grid>
  ), [fee, classes])

  const valueFragment = useMemo(() => (
    <Grid container item className={classes.value} justifyContent='space-between' alignItems='center' wrap='nowrap'>
      <Typography className={classes.infoText}>Value</Typography>
      <Grid className={classes.infoCenter} container item justifyContent='center'>
        <Typography className={classes.greenText}>
          {value} {tokenXName}
        </Typography>
      </Grid>
    </Grid>
  ), [value, tokenXName, classes])

  return (
    <Grid className={classes.root} container direction='row' alignItems='center'>
      <Grid container item className={classes.icons} alignItems='center'>
        <img className={classes.tokenIcon} src={tokenXIcon} alt={tokenXName} />
        <img className={classes.arrows} src={icons.ArrowIcon} alt='Arrow' />
        <img className={classes.tokenIcon} src={tokenYIcon} alt={tokenYName} />
      </Grid>

      <Typography className={classes.names}>
        {tokenXName} - {tokenYName}
      </Typography>

      <Hidden mdUp>
        {feeFragment}
      </Hidden>

      <Grid container item className={classes.mdInfo} direction='row'>
        <Grid container item className={classes.liquidity} justifyContent='center' alignItems='center'>
          <Typography className={classes.infoText}>
            {tokenXLiq} {tokenXName} - {tokenYLiq} {tokenYName}
          </Typography>
        </Grid>

        <Hidden smDown>
          {feeFragment}
        </Hidden>

        <Hidden mdUp>
          {valueFragment}
        </Hidden>

        <Grid container item className={classes.minMax} justifyContent='space-between' alignItems='center' wrap='nowrap'>
          <Typography className={classes.greenText}>MIN - MAX</Typography>
          <Grid className={classes.infoCenter} container item justifyContent='center'>
            <Typography className={classes.infoText}>
              {min} - {max} {tokenXName} per {tokenYName}
            </Typography>
          </Grid>
        </Grid>

        <Hidden smDown>
          {valueFragment}
        </Hidden>
      </Grid>
    </Grid>
  )
}
