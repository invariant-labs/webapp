import React from 'react'
import { MemoryRouter } from 'react-router'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import SaleDetails, { ISaleDetails } from './SaleDetails'

const data: ISaleDetails = {
  salePeriod: '15:30:33',
  gracePeriod: '32:13:45',
  token: {
    symbol: 'SOL',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    value: '122 443'
  },
  tokenPrice: '211.345',
  invariantPrice: '20 000 000'
}

storiesOf('IDO/IDOComponents', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .addDecorator(withKnobs)
  .add('saleDetails', () => <SaleDetails {...data} />)
