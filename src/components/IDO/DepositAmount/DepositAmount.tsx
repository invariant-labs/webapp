import { Grid, Typography, CardMedia } from '@material-ui/core'
import icons from '@static/icons'
import useStyles from './style'
import React from 'react'

export const DepositAmount = () => {
  const classes = useStyles()

  return (
    <Grid>
      <Typography className={classes.inputLabel}>Deposited Amount:</Typography>
      <Grid container direction='row'>
        <Grid>
          <CardMedia className={classes.logoShort} src={icons.LogoShort} />
        </Grid>
        <Grid>
          <Typography className={classes.title}>46.673 xUSD</Typography>
          <Grid container justifyContent='space-between' direction='row'>
            <Typography className={classes.inputLabel}>47.34 USD</Typography>
            <Typography className={classes.inputLabel}>0.0456 SOL</Typography>
            <Typography className={classes.inputLabel}>0.00004 xETH</Typography>
            <Typography className={classes.inputLabel}>0.00313 xBTC</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
