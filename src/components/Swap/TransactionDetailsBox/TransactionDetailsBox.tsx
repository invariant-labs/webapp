import React from 'react'
import { Grid, Typography } from '@mui/material'
import loadingAnimation from '@static/gif/loading.gif'
import { formatNumberWithoutSuffix, printBN } from '@utils/utils'
import { useStyles } from './styles'
import { BN } from '@project-serum/anchor'
import { DECIMAL } from '@invariant-labs/sdk/lib/utils'

interface IProps {
  open: boolean
  fee: { v: BN }
  exchangeRate: { val: number; symbol: string; decimal: number }
  slippage: number
  priceImpact: BN
  isLoadingRate?: boolean
}

const TransactionDetailsBox: React.FC<IProps> = ({
  open,
  fee,
  exchangeRate,
  slippage,
  priceImpact,
  isLoadingRate = false
}) => {
  const { classes } = useStyles({ open })

  const feePercent = Number(printBN(fee.v, DECIMAL - 2))
  const impact = +printBN(priceImpact, DECIMAL - 2)

  return (
    <Grid container className={classes.wrapper}>
      <Grid container className={classes.innerWrapper}>
        <Grid container className={classes.row}>
          <Typography className={classes.label}>Exchange rate:</Typography>
          {isLoadingRate ? (
            <img src={loadingAnimation} className={classes.loading} alt='Loading' />
          ) : (
            <Typography className={classes.value}>
              {exchangeRate.val === Infinity
                ? '-'
                : `${
                    formatNumberWithoutSuffix(exchangeRate.val.toFixed(exchangeRate.decimal)) ===
                    '0'
                      ? '~0'
                      : formatNumberWithoutSuffix(exchangeRate.val.toFixed(exchangeRate.decimal))
                  } ${exchangeRate.symbol}`}
            </Typography>
          )}
        </Grid>

        <Grid container className={classes.row}>
          <Typography className={classes.label}>Fee:</Typography>
          <Typography className={classes.value}>{`${feePercent}%`}</Typography>
        </Grid>

        <Grid container className={classes.row}>
          <Typography className={classes.label}>Price impact:</Typography>
          <Typography className={classes.value}>
            {impact < 0.01 ? '<0.01%' : `${impact.toFixed(2)}%`}
          </Typography>
        </Grid>
        <Grid container className={classes.row}>
          <Typography className={classes.label}>Slippage tolerance:</Typography>
          <Typography className={classes.value}>{slippage}%</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TransactionDetailsBox
