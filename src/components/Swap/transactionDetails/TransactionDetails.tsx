import { printBN } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import BN from 'bn.js'
import React from 'react'
import { PRICE_DECIMAL } from '@consts/static'
import { useStyles } from './style'
import { Decimal } from '@invariant-labs/sdk/lib/market'

interface IProps {
  open: boolean
  fee: {v: BN}
  exchangeRate: {val: string, symbol: string}
}

const percentValueDisplay = (amount: Decimal): {value: BN, decimal: number} => {
  const amountLength = amount.v.toString().length - 1
  const amountDec = PRICE_DECIMAL - amountLength - 2
  const amountValue = amount.v.div(new BN(10).pow(new BN(amountLength)))
  return {
    value: amountValue,
    decimal: amountDec
  }
}

const TransactionDetails: React.FC<IProps> = ({ open, fee, exchangeRate }) => {
  const percent = percentValueDisplay(fee)
  const classes = useStyles()
  return (
    <Grid container className={classes.transactionDetailsInfo} style={{ opacity: open ? '1' : '0', zIndex: open ? 10 : 0 }}>
      <Grid className={classes.detailsInfoWrapper}>
        <Typography component='h2'>Transaction details</Typography>
        <Typography component='p'>
                Fee: <Typography component='span'>
            {printBN(percent.value, percent.decimal)} %
          </Typography>
        </Typography>
        <Typography component='p'>
                Exchange rate: <Typography component='span'>
            {exchangeRate.val} {exchangeRate.symbol}
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  )
}
export default TransactionDetails
