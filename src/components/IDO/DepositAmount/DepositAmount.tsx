import React from 'react'
import icons from '@static/icons'
import useStyles from './style'
import { Grid, Typography, CardMedia } from '@material-ui/core'

export interface IDepositAmount {
  currencyRates: { currency: string; value: string }[]
}
const DepositAmount: React.FC<IDepositAmount> = ({ currencyRates }) => {
  const classes = useStyles()

  const mainCurrency = currencyRates[0]
  return (
    <Grid>
      <Typography className={classes.inputLabel}>Deposited Amount:</Typography>
      <Grid container direction='row' alignItems='center'>
        <CardMedia component='img' className={classes.logo} src={icons.LogoShort} />
        <Grid style={{ flex: '1 1 0%' }}>
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

export default DepositAmount
