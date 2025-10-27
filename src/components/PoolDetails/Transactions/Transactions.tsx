import React from 'react'
import { Grid, Typography } from '@mui/material'

import useStyles from './style'

export interface IProps {}

export const Transactions: React.FC<IProps> = () => {
  const { classes } = useStyles()

  return (
    <Grid className={classes.wrapper}>
      <Typography className={classes.header}>Transactions</Typography>
      <Grid className={classes.container}></Grid>
    </Grid>
  )
}

export default Transactions
