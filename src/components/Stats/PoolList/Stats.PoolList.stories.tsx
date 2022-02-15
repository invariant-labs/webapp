import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import PoolList from './PoolList'

storiesOf('stats/PoolList', module)
  .addDecorator(withKnobs)
  .add('Pools', () => {
    const data = Array(40)
      .fill(0)
      .map(() => {
        return {
          symbolFrom: 'BTC',
          fromLogoURI:
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
          symbolTo: 'USDC',
          toLogoURI:
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
          fee: '0.05',
          volume: '9,242,263,567.34',
          TVL: '$242,263,567.34'
        }
      })

    return <PoolList data={data} />
  })
