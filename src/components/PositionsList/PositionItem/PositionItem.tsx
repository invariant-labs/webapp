import { Grid, Typography } from '@material-ui/core'
import React from 'react'
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
  return (
    <Grid className={classes.root} container direction='row' alignItems='center'>
      <Grid container item className={classes.icons} alignItems='center'>
        <img className={classes.tokenIcon} src={tokenXIcon} alt={tokenXName} />
        <img className={classes.arrows} src={icons.ArrowIcon} alt={'Arrow'} />
        <img className={classes.tokenIcon} src={tokenYIcon} alt={tokenYName} />
      </Grid>

      <Typography className={classes.names}>
        {tokenXName} - {tokenYName}
      </Typography>

      <Grid container item className={classes.liquidity} justifyContent='center' alignItems='center'>
        <Typography className={classes.infoText}>
          {tokenXLiq} {tokenXName} - {tokenYLiq} {tokenYName}
        </Typography>
      </Grid>

      <Grid container item className={classes.fee} justifyContent='center' alignItems='center'>
        <Typography className={classes.infoText}>
          {fee}% fee
        </Typography>
      </Grid>

      <Grid container item className={classes.minMax} justifyContent='space-between' alignItems='center'>
        <Typography className={classes.greenText}>MIN-MAX</Typography>
        <Typography className={classes.infoText}>
          {min} - {max} {tokenXName} per {tokenYName}
        </Typography>
      </Grid>

      <Grid container item className={classes.value} justifyContent='space-between' alignItems='center'>
        <Typography className={classes.infoText}>Value</Typography>
        <Typography className={classes.greenText}>
          {value} {tokenXName}
        </Typography>
      </Grid>
    </Grid>
  )
}
