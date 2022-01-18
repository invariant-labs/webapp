import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import { SaleDetails } from './SaleDetails/SaleDetails'
import { DepositCard } from './DepositCard/DepositCard'

export const IDO = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.wrapper} direction='column'>
      <Typography className={classes.title}>IDO</Typography>
      <Grid container className={classes.row}>
        <DepositCard className={classes.deposit} />
        <SaleDetails />
      </Grid>
    </Grid>
  )
}
