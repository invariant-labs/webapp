import { Grid, Typography } from '@material-ui/core'
import { TimeData } from '@reducers/stats'
import React from 'react'

import useStyles from './style'

interface IInfo {
  amount?: string
  currencyType: string
  balance: string
}

export const Info: React.FC<IInfo> = ({ amount, currencyType, balance }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Typography className={classes.container}>
        <span className={classes.title}>Token: </span>{' '}
        <span className={classes.subtitle}>{currencyType}</span>
      </Typography>
      <Typography className={classes.container}>
        <span className={classes.title}>Amount: </span>{' '}
        <span className={classes.subtitle}>{amount + ' ' + currencyType}</span>
      </Typography>
      <Typography className={classes.container}>
        <span className={classes.title}>Balance before: </span>{' '}
        <span className={classes.subtitle}>{balance + ' ' + currencyType}</span>
      </Typography>
      <Typography className={classes.container}>
        <span className={classes.title}>Balance after: </span>
        <span className={classes.subtitle}>
          {amount ? parseFloat(balance) - parseFloat(amount) + ' ' + currencyType : '--'}
        </span>
      </Typography>
    </Grid>
  )
}

export default Info
