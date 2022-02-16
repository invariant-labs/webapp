import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import IDO from './IDO'

storiesOf('newUi/ido', module)
  .addDecorator(withKnobs)
  .add('connect a wallet', () => {
    return (
      <IDO xBTC='0.0 xBTC' xETH='0.0 xETH' sol='0.0432 SOL' usd='47.43 USD' xUSD='46.643 xUSD' />
    )
  })
