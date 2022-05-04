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
      <Typography className={classes.text}>Pair</Typography>
      <Typography className={classes.text}>Remaining</Typography>
      {!isSmall ? <Typography className={classes.text}>Total supply</Typography> : null}
      {!isExSmall ? <Typography className={classes.text}>Vesting term</Typography> : null}
    </Grid>
  )
}

export default BondHeader
