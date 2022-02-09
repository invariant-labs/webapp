import { printBN } from '@consts/utils'
import { Grid, Popover, Typography, Button } from '@material-ui/core'
import BN from 'bn.js'
import React from 'react'
import { PRICE_DECIMAL } from '@consts/static'
import { useStyles } from './style'
import { Decimal } from '@invariant-labs/sdk/lib/market'

interface IProps {
  open: boolean
  fee: { v: BN }
  exchangeRate: { val: number; symbol: string }
  anchorTransaction: HTMLButtonElement | null
  handleCloseTransactionDetails: () => void
  decimal: number
}

const percentValueDisplay = (amount: Decimal): { value: BN; decimal: number } => {
  const amountLength = amount.v.toString().length - 1
  const amountDec = PRICE_DECIMAL - amountLength - 2
  const amountValue = amount.v.div(new BN(10).pow(new BN(amountLength)))
  return {
    value: amountValue,
    decimal: amountDec
  }
}

const TransactionDetails: React.FC<IProps> = ({
  open,
  fee,
  exchangeRate,
  anchorTransaction,
  decimal,
  handleCloseTransactionDetails
}) => {
  const percent = percentValueDisplay(fee)
  const classes = useStyles()

  return (
    <Popover
      open={open}
      classes={{ root: classes.root, paper: classes.papper }}
      onClose={handleCloseTransactionDetails}
      anchorEl={anchorTransaction}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}>
      <Grid
        container
        className={classes.transactionDetailsInfo}
        style={{ opacity: open ? '1' : '0', zIndex: open ? 10 : 0 }}>
        <Grid className={classes.detailsInfoWrapper}>
          <Grid container className={classes.closeTransactionContainer}>
            <Typography component='h2'>Transaction details</Typography>
            <Button
              style={{ background: 'transparent' }}
              className={classes.closeTransactionButton}
              onClick={handleCloseTransactionDetails}></Button>
          </Grid>

          <Typography component='p'>
            Fee:{' '}
            <Typography component='span'>{printBN(percent.value, percent.decimal)} %</Typography>
          </Typography>
          <Typography component='p'>
            Exchange rate:{' '}
            <Typography component='span'>
              {exchangeRate.val.toFixed(decimal)} {exchangeRate.symbol}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </Popover>
  )
}

export default TransactionDetails
