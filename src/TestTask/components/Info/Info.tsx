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

  const currencyTypeShort = currencyType === 'AERGO' ? 'ARG' : currencyType

  return (
    <Grid container className={classes.root}>
      <Typography className={classes.container}>
        <span className={classes.title}>Token: </span>{' '}
        <span className={classes.subtitle}>{currencyTypeShort}</span>
      </Typography>
      <Typography className={classes.container}>
        <span className={classes.title}>Amount: </span>{' '}
        <span className={classes.subtitle}>{amount + ' ' + currencyTypeShort}</span>
      </Typography>
      <Typography className={classes.container}>
        <span className={classes.title}>Balance before: </span>{' '}
        <span className={classes.subtitle}>{balance + ' ' + currencyTypeShort}</span>
      </Typography>
      <Typography className={classes.container}>
        <span className={classes.title}>Balance after: </span>
        <span className={classes.subtitle}>
          {amount && parseFloat(balance) > parseFloat(amount)
            ? (parseFloat(balance) - parseFloat(amount)).toString().split('.')[0] +
              '.' +
              (parseFloat(balance) - parseFloat(amount)).toString().split('.')[1].slice(0, 4)
            : '0.0'}
        </span>
      </Typography>
    </Grid>
  )
}

export default Info
