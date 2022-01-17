import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'

export const IDO = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.wrapper} direction='column'>
      <Typography className={classes.title}>IDO</Typography>
      <Grid container></Grid>
    </Grid>
  )
}
