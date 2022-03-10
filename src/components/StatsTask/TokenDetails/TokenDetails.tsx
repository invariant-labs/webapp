import { Grid, Typography } from '@material-ui/core'
import classNames from 'classnames'
import React from 'react'
import useStyles from './style'

export interface TokenDetailsInterface {
  currency: string
  valueAmount: number
  valueBalanceBefore: number
  valueBalanceAfter: number
}

export const TokenDetails: React.FC<TokenDetailsInterface> = ({
  currency,
  valueAmount,
  valueBalanceBefore,
  valueBalanceAfter
}) => {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container direction='column'>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        className={classNames(classes.spacer)}>
        <Typography className={classes.label}>Token:</Typography>
        <Typography className={classes.value}>{currency}</Typography>
      </Grid>
      <Grid container direction='row' justifyContent='space-between' className={classes.spacer}>
        <Typography className={classes.label}>Amount:</Typography>
        <Typography className={classes.value}>
          {valueAmount} {currency}
        </Typography>
      </Grid>
      <Grid container direction='row' justifyContent='space-between' className={classes.spacer}>
        <Typography className={classes.label}>Balance before:</Typography>
        <Typography className={classes.value}>
          {valueBalanceBefore} {currency}
        </Typography>
      </Grid>
      <Grid container direction='row' justifyContent='space-between' className={classes.spacer}>
        <Typography className={classes.label}>Balance after:</Typography>
        <Typography className={classes.value}>
          {valueBalanceAfter} {currency}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default TokenDetails
