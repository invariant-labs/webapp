import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import { theme } from '@static/theme'
import React from 'react'
import { useStyles } from './style'

const HeaderList = () => {
  const classes = useStyles()
  const isExSmall = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Grid container classes={{ container: classes.container }}>
      {isExSmall ? null : <Typography>Pair</Typography>}
      <Typography>You've bought</Typography>
      <Typography>Redeemable</Typography>
      <Typography>Vest period</Typography>
    </Grid>
  )
}

export default HeaderList
