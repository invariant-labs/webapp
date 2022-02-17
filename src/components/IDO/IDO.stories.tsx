import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import IDO from './IDO'

storiesOf('newUi/ido', module)
  .addDecorator(withKnobs)
  .add('connect a wallet', () => {
    return (
      <IDO
        HEADER='Deposit your SOL'
        xBTC='0.00000 xBTC'
        xETH='0.00000 xETH'
        SOL='0.0432 SOL'
        USD='47.43 USD'
        xUSD='46.643 xUSD'
        ButtonHeader='Connect a wallet'
      />
    )
  })
  .add('sell period', () => {
    return (
      <IDO
        HEADER='Deposit your SOL'
        xBTC='0.00000 xBTC'
        xETH='0.00000 xETH'
        SOL='0.0432 SOL'
        USD='47.43 USD'
        xUSD='46.643 xUSD'
        ButtonHeader='Deposit'
      />
    )
  })
  .add('grace period', () => {
    return (
      <IDO
        HEADER='Deposit your SOL'
        xBTC='0.00000 xBTC'
        xETH='0.00000 xETH'
        SOL='0.0432 SOL'
        USD='47.43 USD'
        xUSD='46.643 xUSD'
        ButtonHeader='Whitdraw'
      />
    )
  })
  .add('claiming', () => {
    return (
      <IDO
        HEADER='Deposit your SOL'
        xBTC='0.00000 xBTC'
        xETH='0.00000 xETH'
        SOL='0.0432 SOL'
        USD='47.43 USD'
        xUSD='46.643 xUSD'
        ButtonHeader='Claim'
      />
    )
  })
