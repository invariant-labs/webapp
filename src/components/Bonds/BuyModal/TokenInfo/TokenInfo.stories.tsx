import { storiesOf } from '@storybook/react'
import React from 'react'
import TokenInfo from './TokenInfo'

storiesOf('Bonds/TokenInfo', module).add('TokenInfo', () => {
  return (
    <TokenInfo
      first={{
        setValue: () => {},
        placeholder: '0.5',
        currency: 'SNY',
        onMaxClick: () => {},
        currencyIconSrc:
          'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
        decimalsLimit: 6,
        percentageChange: 7.0,
        usdValue: 205341.43,
        balanceValue: '1.045'
      }}
      second={{
        setValue: () => {},
        placeholder: '0.0',
        currency: 'SNY',
        onMaxClick: () => {},
        currencyIconSrc:
          'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
        decimalsLimit: 6,
        percentageChange: 4.15,
        usdValue: 205341.43,
        balanceValue: '-200000000'
      }}
    />
  )
})
