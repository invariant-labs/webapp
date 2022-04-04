import { Grid, Typography } from '@material-ui/core'
import { colors } from '@static/theme'
import React from 'react'
import { useStyles } from './style'

const HederList = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      style={{ color: colors.invariant.textGrey, fontWeight: 400 }}
      classes={{ container: classes.containter }}>
      <Typography>You've bought</Typography>
      <Typography>You've paid</Typography>
      <Typography>Redeemable</Typography>
      <Typography>Vest period</Typography>
    </Grid>
  )
}

export default HederList
