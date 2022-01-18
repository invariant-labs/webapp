import { Grid, Typography, CardMedia } from '@material-ui/core'
import icons from '@static/icons'
import useStyles from './style'
import React from 'react'

export const DepositAmount = () => {
  const classes = useStyles()

  return (
    <Grid>
      <Typography className={classes.inputLabel}>Deposited Amount:</Typography>
      <Grid container direction='row' justifyContent='space-between' alignItems='center'>
        <CardMedia component='img' className={classes.logo} src={icons.LogoShort} />
        <Grid>
          <Typography className={classes.title}>46.673 xUSD</Typography>
          <Grid container justifyContent='space-between' direction='row'>
            <Typography className={classes.currencyInputLabel}>47.34 USD</Typography>
            <Typography className={classes.currencyInputLabel}>0.0456 SOL</Typography>
            <Typography className={classes.currencyInputLabel}>0.00004 xETH</Typography>
            <Typography className={classes.currencyInputLabel}>0.00313 xBTC</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
