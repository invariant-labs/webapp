import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import DepositAmount, { IDepositAmount } from './DepositAmount'

const currencyData: IDepositAmount['currencyRates'] = [
  { currency: 'USD', value: '47.22' },
  { currency: 'SOL', value: '0.0323' },
  { currency: 'ETH', value: '0.324231' },
  { currency: 'BTC', value: '0.00022' }
]

storiesOf('IDO/IDOComponents', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .addDecorator(withKnobs)
  .add('depositAmount', () => {
    return (
      <div style={{ maxWidth: 400, background: '#1C1B1E', padding: 20, borderRadius: 10 }}>
        <DepositAmount currencyRates={currencyData} />
      </div>
    )
  })
