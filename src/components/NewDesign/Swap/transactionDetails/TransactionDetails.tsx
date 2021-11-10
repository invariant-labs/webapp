import { printBN } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import BN from 'bn.js'
import React from 'react'
import { useStyles } from './style'

interface IProps {
  open: boolean
  fee: {val: BN, scale: number}
  exchangeRate: {val: string, symbol: string}
}

const TransactionDetails: React.FC<IProps> = ({ open, fee, exchangeRate }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.transactionDetailsInfo} style={{ opacity: open ? '1' : '0', zIndex: open ? 1 : 0 }}>
      <Grid className={classes.detailsInfoWrapper}>
        <Typography component='h2'>Transaction details</Typography>
        <Typography component='p'>
                Fee: <Typography component='span'>
            {printBN(fee.val, fee.scale)} %
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
