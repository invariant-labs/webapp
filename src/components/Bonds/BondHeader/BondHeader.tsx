import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import { theme } from '@static/theme'
import React from 'react'
import { useStyles } from './style'

const BondHeader = () => {
  const classes = useStyles()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isExSmall = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <Grid container classes={{ container: classes.container }}>
      <Typography>Pair</Typography>
      <Typography>Price</Typography>
      <Typography>ROI</Typography>
      {!isExSmall ? <Typography>Purchased</Typography> : null}
      {!isSmall ? <Typography className={classes.vesting}>Vesting term</Typography> : null}
    </Grid>
  )
}

export default BondHeader
