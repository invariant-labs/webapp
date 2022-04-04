import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import { colors, theme } from '@static/theme'
import React from 'react'
import { useStyles } from './style'

const BondHeader = () => {
  const classes = useStyles()
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isExSmall = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <Grid
      container
      style={{ color: colors.invariant.textGrey, fontWeight: 400 }}
      classes={{ container: classes.container }}>
      <Typography>Pair</Typography>
      <Typography>Price</Typography>
      <Typography>ROI</Typography>
      {!isExSmall ? <Typography>Purchased</Typography> : ''}
      {!isSmall ? <Typography className={classes.vesting}>Vesting term</Typography> : ''}
    </Grid>
  )
}

export default BondHeader
