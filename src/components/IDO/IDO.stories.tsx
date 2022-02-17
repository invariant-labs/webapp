import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import IDO from './IDO'

storiesOf('newUi/ido', module)
  .addDecorator(withKnobs)
  .add('connect a wallet', () => {
    return (
      <IDO
        Header='Deposit your SOL'
        Xbtc='0.00000 xBTC'
        Xeth='0.00000 xETH'
        Sol='0.0432 SOL'
        Usd='47.43 USD'
        Xusd='46.643 xUSD'
        ButtonHeader='Connect a wallet'
        Disabled={true}
      />
    )
  })
  .add('sell period', () => {
    return (
      <IDO
        Header='Deposit your SOL'
        Xbtc='0.00000 xBTC'
        Xeth='0.00000 xETH'
        Sol='0.0432 SOL'
        Usd='47.43 USD'
        Xusd='46.643 xUSD'
        ButtonHeader='Deposit'
        Disabled={true}
      />
    )
  })
  .add('grace period', () => {
    return (
      <IDO
        Header='Deposit your SOL'
        Xbtc='0.00000 xBTC'
        Xeth='0.00000 xETH'
        Sol='0.0432 SOL'
        Usd='47.43 USD'
        Xusd='46.643 xUSD'
        ButtonHeader='Whitdraw'
        Disabled={true}
      />
    )
  })
  .add('claiming', () => {
    return (
      <IDO
        Header='Deposit your SOL'
        Xbtc='0.00000 xBTC'
        Xeth='0.00000 xETH'
        Sol='0.0432 SOL'
        Usd='47.43 USD'
        Xusd='46.643 xUSD'
        ButtonHeader='Claim'
        Disabled={true}
      />
    )
  })
