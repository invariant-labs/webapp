import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import Ido from './Ido'

storiesOf('newUi/Ido', module)
  .addDecorator(withKnobs)
  .add('connect a wallet', () => {
    return (
      <Ido
        xBtc='Deposit your SOL'
        xEth='0.00000 xBTC'
        sol='0.00000 xETH'
        usd='0.0432 SOL'
        xUsd='47.43 USD'
        header='46.643 xUSD'
        buttonHeader='Connect a wallet'
      />
    )
  })
  .add('sell period', () => {
    return (
      <Ido
        xBtc='Deposit your SOL'
        xEth='0.00000 xBTC'
        sol='0.00000 xETH'
        usd='0.0432 SOL'
        xUsd='47.43 USD'
        header='46.643 xUSD'
        buttonHeader='Connect a wallet'
      />
    )
  })
  .add('grace period', () => {
    return (
      <Ido
        xBtc='Deposit your SOL'
        xEth='0.00000 xBTC'
        sol='0.00000 xETH'
        usd='0.0432 SOL'
        xUsd='47.43 USD'
        header='46.643 xUSD'
        buttonHeader='Connect a wallet'
      />
    )
  })
  .add('claiming', () => {
    return (
      <Ido
        xBtc='Deposit your SOL'
        xEth='0.00000 xBTC'
        sol='0.00000 xETH'
        usd='0.0432 SOL'
        xUsd='47.43 USD'
        header='46.643 xUSD'
        buttonHeader='Connect a wallet'
      />
    )
  })
