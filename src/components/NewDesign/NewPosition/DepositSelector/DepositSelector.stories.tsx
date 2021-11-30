import React from 'react'
import { storiesOf } from '@storybook/react'
import DepositSelector from './DepositSelector'
import { SwapToken } from '@components/NewDesign/Swap/Swap'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

const tokens: SwapToken[] = [
  {
    balance: new BN(100).mul(new BN(34786)),
    decimal: 6,
    symbol: 'SOL',
    assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
    name: 'Wrapped Solana',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    address: new PublicKey('So11111111111111111111111111111111111111112')
  },
  {
    balance: new BN(100).mul(new BN(126)),
    decimal: 6,
    symbol: 'BTC',
    assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    name: 'BTC',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
    address: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E')
  },
  {
    balance: new BN(10).mul(new BN(5342)),
    decimal: 6,
    symbol: 'USDC',
    assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    name: 'USD coin',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    address: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
  }
]

storiesOf('position/depositSelector', module).add('deposit', () => (
  <DepositSelector
    tokens={tokens}
    setPositionTokens={() => {}}
    setFeeValue={() => {}}
    onAddLiquidity={() => {}}
    token1Max={5}
    token2Max={20}
    token1InputState={{
      blocked: false
    }}
    token2InputState={{
      blocked: true,
      blockerInfo: 'Select token.'
    }}
    leftRangeTickIndex={100}
    rightRangeTickIndex={200}
    calcCurrentPoolProportion={() => 1}
    feeTiers={[0.05, 0.3, 1]}
    isCurrentPoolExisting={true}
  />
))
