import AmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import { SwapToken } from '@components/Swap/Swap'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { DepositAmount } from '../DepositAmount/DepositAmount'
import classNames from 'classnames'

const tokens: SwapToken[] = [
  {
    balance: new BN(100).mul(new BN(34786)),
    decimals: 6,
    symbol: 'SOL',
    assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
    name: 'Wrapped Solana',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    address: new PublicKey('So11111111111111111111111111111111111111112')
  },
  {
    balance: new BN(100).mul(new BN(126)),
    decimals: 6,
    symbol: 'BTC',
    assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    name: 'BTC',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
    address: new PublicKey('So11111111111111111111111111111111111111112')
  },
  {
    balance: new BN(10).mul(new BN(5342)),
    decimals: 6,
    symbol: 'USDC',
    assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    name: 'USD coin',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    address: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
  }
]

export interface IDepositCard {
  className?: string
}

export const DepositCard: React.FC<IDepositCard> = ({ className }) => {
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
      <DepositAmount />
      <OutlinedButton name='Connect a wallet' />
    </Grid>
  )
}
