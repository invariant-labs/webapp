import { Grid, Typography, CardMedia } from '@material-ui/core'
import icons from '@static/icons'
import useStyles from './style'
import React from 'react'

export interface IDepositAmount {
  currencyRates: { currency: string; value: string }[]
}

export const DepositAmount: React.FC<IDepositAmount> = ({ currencyRates }) => {
  const classes = useStyles()

  const mainCurrency = currencyRates[0]
  return (
    <Grid>
      <Typography className={classes.inputLabel}>Deposited Amount:</Typography>
      <Grid container direction='row' justifyContent='space-between' alignItems='center'>
        <CardMedia component='img' className={classes.logo} src={icons.LogoShort} />
        <Grid>
          <Typography className={classes.title}>
            {mainCurrency.value} x{mainCurrency.currency}
          </Typography>
          <Grid container justifyContent='space-between' direction='row'>
            {currencyRates.map(data => (
              <Typography key={data.currency} className={classes.currencyInputLabel}>
                {data.value} {data.currency}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
