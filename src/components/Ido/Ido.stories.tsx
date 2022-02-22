import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import Ido from './Ido'
import { SwapToken } from '@components/Swap/Swap'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import IdoLabel from '@components/IdoLabel/IdoLabel'
import { Grid } from '@material-ui/core'
import useStyle from './style'
import { printBN } from '@consts/utils'

const token: SwapToken = {
  balance: new BN(100).mul(new BN(34786)),
  decimals: 6,
  symbol: 'SOL',
  assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
  name: 'Wrapped Solana',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  address: new PublicKey('So11111111111111111111111111111111111111112')
}

storiesOf('newUi/Ido', module)
  .addDecorator(withKnobs)
  .add('connect a wallet', () => {
    return (
      <Ido
        xBtc='46.643 xUSD'
        xEth='0.00000 xBTC'
        sol='0.00000 xETH'
        usd='0.0432 SOL'
        xUsd='47.43 USD'
        header='Deposit your SOL'
        buttonHeader='Connect a wallet'
        token={token}
        decimal={token.decimals}
        balance={printBN(token.balance, token.decimals)}
      />
    )
  })
  .add('sell period', () => {
    return (
      <Ido
        xBtc='46.643 xUSD'
        xEth='0.00000 xBTC'
        sol='0.00000 xETH'
        usd='0.0432 SOL'
        xUsd='47.43 USD'
        header='Claim your SOL'
        buttonHeader='Connect a wallet'
        token={token}
        decimal={token.decimals}
        balance={printBN(token.balance, token.decimals)}
      />
    )
  })
  .add('grace period', () => {
    return (
      <Ido
        xBtc='46.643 xUSD'
        xEth='0.00000 xBTC'
        sol='0.00000 xETH'
        usd='0.0432 SOL'
        xUsd='47.43 USD'
        header='Withdraw your SOL'
        buttonHeader='Connect a wallet'
        token={token}
        decimal={token.decimals}
        balance={printBN(token.balance, token.decimals)}
      />
    )
  })
  .add('claiming', () => {
    return (
      <Ido
        xBtc='46.643 xUSD'
        xEth='0.00000 xBTC'
        sol='0.00000 xETH'
        usd='0.0432 SOL'
        xUsd='47.43 USD'
        header='Claim your SOL'
        buttonHeader='Connect a wallet'
        token={token}
        decimal={token.decimals}
        balance={printBN(token.balance, token.decimals)}
      />
    )
  })
  .add('mobile', () => {
    const classes = useStyle()

    return (
      <Grid container className={classes.container}>
        <Ido
          xBtc='46.643 xUSD'
          xEth='0.00000 xBTC'
          sol='0.00000 xETH'
          usd='0.0432 SOL'
          xUsd='47.43 USD'
          header='Claim your SOL'
          buttonHeader='Connect a wallet'
          token={token}
          decimal={token.decimals}
          balance={printBN(token.balance, token.decimals)}
        />
        <IdoLabel
          sale='15:03:33'
          grace='32:29:27'
          sol='121 124 846'
          estimated='218.839'
          invariant='20 000 000'
          solToken='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
          estToken='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
        />
      </Grid>
    )
  })
