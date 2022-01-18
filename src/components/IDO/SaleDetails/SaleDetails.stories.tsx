import React from 'react'
import { storiesOf } from '@storybook/react'
import { ISaleDetails, SaleDetails } from './SaleDetails'
import { MemoryRouter } from 'react-router'
import { withKnobs } from '@storybook/addon-knobs'

const data: ISaleDetails = {
  salePeriod: '15:30:33',
  gracePeriod: '32:13:45',
  tokens: [
    {
      symbol: 'BTC',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
      value: '122 452 443'
    },
    {
      symbol: 'SNY',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y/logo.png',
      value: '122 452 443 532'
    },
    {
      symbol: 'SOL',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      value: '122 443'
    }
  ],
  tokenPrice: '211.345',
  invariantPrice: '20 000 000'
}

storiesOf('IDO/IDOComponents', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .addDecorator(withKnobs)
  .add('saleDetails', () => {
    return (
      <div style={{ width: 400 }}>
        <SaleDetails {...data} />
      </div>
    )
  })
