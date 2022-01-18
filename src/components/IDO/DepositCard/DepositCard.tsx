import AmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { DepositAmount, IDepositAmount } from '../DepositAmount/DepositAmount'
import classNames from 'classnames'
import { SwapToken } from '@components/Swap/Swap'

export interface IDepositCard {
  className?: string
  tokens: SwapToken[]
  currencyRates: IDepositAmount['currencyRates']
}

export const DepositCard: React.FC<IDepositCard> = ({ className, tokens, currencyRates }) => {
  const classes = useStyles()

  return (
    <Grid container className={classNames(classes.card, className)} direction='column'>
      <Typography className={classes.title}>Deposit your SOL</Typography>
      <Grid>
        <Grid container direction='row' justifyContent='space-between'>
          <Typography className={classes.inputLabel}>Est.:56.0278</Typography>
          <Typography className={classes.inputLabel}>Balance: 100.54 SOL</Typography>
        </Grid>
        <AmountInput
          setValue={() => {}}
          decimal={6}
          placeholder={'0.0'}
          onMaxClick={() => {}}
          tokens={tokens}
          current={tokens[0]}
          onSelect={(chosen: string) => console.log(`chosen: ${chosen}`)}
        />
      </Grid>
      <DepositAmount currencyRates={currencyRates} />
      <OutlinedButton name='Connect a wallet' className={classes.button} />
    </Grid>
  )
}
