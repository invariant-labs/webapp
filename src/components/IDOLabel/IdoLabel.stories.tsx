import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import IDOLabel from './IDOLabel'

storiesOf('newUi/idoLabel', module)
  .addDecorator(withKnobs)
  .add('label', () => {
    return (
      <IDOLabel
        Sale='15:03:33'
        Grace='32:29:27'
        SOL='121 124 846'
        Estimated='218.839'
        Invariant='20 000 000'
        SolToken='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
        EstToken='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
      />
    )
  })
