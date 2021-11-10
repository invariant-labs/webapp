import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { toBlur } from '@consts/uiUtils'
import { BN } from '@project-serum/anchor'
import TransactionDetails from '@components/NewDesign/Swap/transactionDetails/TransactionDetails'
import React from 'react'

storiesOf('newUi/swap', module)
  .addDecorator(withKnobs)
  .add('transaction details', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <TransactionDetails
        open={true}
        fee={{ val: new BN(1), scale: 3 }}
        exchangeRate={{ val: '0.4321', symbol: 'SNY' }}
      />
    </div>
  ))
