import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'

import useStyle from './style'

interface IDOinterface {
  xBTC: string
  xETH: string
  sol: string
  usd: string
  xUSD: string
}

const IDO: React.FC<IDOinterface> = () => {
  const classes = useStyle()

  return (
    <Grid container className={classes.idoWrapper}>
      <Grid container className={classes.header}>
        <Typography component='h1'>IDO</Typography>
      </Grid>
      <Grid container className={classes.root} direction='column'>
        <Box className={classes.depositHeader}>
          <Typography component='h1'>Deposit your SOL</Typography>
        </Box>
        <Grid>input here</Grid>
      </Grid>
    </Grid>
  )
}

export default IDO
