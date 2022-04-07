import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { BN } from '@project-serum/anchor'
import React from 'react'
import TransactionDetailsBox from './TransactionDetailsBox'

storiesOf('newUi/swap', module)
  .addDecorator(withKnobs)
  .add('transaction details box', () => (
    <div style={{ width: 400 }}>
      <TransactionDetailsBox
        open
        fee={{ v: new BN(1000) }}
        exchangeRate={{ val: 0.4321, symbol: 'SNY', decimal: 6 }}
        slippage={new BN(100000)}
        priceImpact={new BN(400000)}
        minimumReceived={{ val: new BN(1000000000), symbol: 'BTC', decimal: 6 }}
      />
    </div>
  ))
