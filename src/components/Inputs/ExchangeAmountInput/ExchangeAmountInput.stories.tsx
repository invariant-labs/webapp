import React from 'react'
import { storiesOf } from '@storybook/react'
import ExchangeAmountInput from './ExchangeAmountInput'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import { action } from '@storybook/addon-actions'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { SwapToken } from '@components/Swap/Swap'

const tokens: SwapToken[] = [
  {
    balance: new BN(100).mul(new BN(34786)),
    decimals: 6,
    symbol: 'SOL',
    assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
    name: 'Wrapped Solana',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    address: new PublicKey('So11111111111111111111111111111111111111112')
  },
  {
    balance: new BN(100).mul(new BN(126)),
    decimals: 6,
    symbol: 'BTC',
    assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    name: 'BTC',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
    address: new PublicKey('So11111111111111111111111111111111111111112')
  },
  {
    balance: new BN(10).mul(new BN(5342)),
    decimals: 6,
    symbol: 'USDC',
    assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    name: 'USD coin',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    address: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
  }
]

storiesOf('inputs/exchangeAmount', module)
  .addDecorator(withKnobs)
  .add('token', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <ExchangeAmountInput
        setValue={() => {}}
        decimal={6}
        placeholder={'0.0'}
        onMaxClick={() => {}}
        tokens={tokens}
        current={tokens[0]}
        onSelect={index => action(`chosen index: ${index}`)()}
        disabled={false}
      />
    </div>
  ))
