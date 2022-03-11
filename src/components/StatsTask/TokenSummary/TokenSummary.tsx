import { Grid, Typography } from '@material-ui/core'
import classNames from 'classnames'
import React from 'react'
import useStyles from './style'

export interface TokenSummeryInterface {
  valueAmount: number
  valueBalanceBefore: number
  valueBalanceAfter: number
  currency: String
}

export const TokenSummary: React.FC<TokenSummeryInterface> = ({
  valueAmount,
  valueBalanceBefore,
  valueBalanceAfter,
  currency
}) => {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container direction='column'>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        className={classNames(classes.spacing)}>
        <Typography className={classes.category}>Token:</Typography>
        <Typography className={classes.token}>
          {valueAmount} {currency}
        </Typography>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        className={classNames(classes.spacing)}>
        <Typography className={classes.category}>Amount:</Typography>
        <Typography className={classes.token}>
          {valueAmount} {currency}
        </Typography>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        className={classNames(classes.spacing)}>
        <Typography className={classes.category}>Balance before:</Typography>
        <Typography className={classes.token}>
          {valueBalanceBefore} {currency}
        </Typography>
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        className={classNames(classes.spacing)}>
        <Typography className={classes.category}>Balance after:</Typography>
        <Typography className={classes.token}>
          {valueBalanceAfter} {currency}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default TokenSummary
