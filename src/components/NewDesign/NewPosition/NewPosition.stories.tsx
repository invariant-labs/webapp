import React from 'react'
import { storiesOf } from '@storybook/react'
import NewPosition from './NewPosition'
import { BN } from '@project-serum/anchor'
import { SwapToken } from '../Swap/Swap'
import { PublicKey } from '@solana/web3.js'

const ticksToData = () => {
  const ticks = [
    { index: 90, delta: 10 },
    { index: 110, delta: 30 },
    { index: 160, delta: 60 },
    { index: 170, delta: 20 },
    { index: 210, delta: -20 },
    { index: 220, delta: -10 },
    { index: 230, delta: -30 },
    { index: 260, delta: -20 },
    { index: 280, delta: -40 }
  ]
  const fields: Array<{ x: number; y: number }> = []

  let currentLiquidity = 10
  for (let i = 0; i < 10000; i += 1) {
    if (ticks.length > 0 && i > ticks[0].index) {
      currentLiquidity += ticks[0].delta
      ticks.shift()
    }

    fields.push({ x: i, y: currentLiquidity })
  }

  return fields
}

const data = ticksToData()

const tokens: SwapToken[] = [
  {
    balance: new BN(100).mul(new BN(34786)),
    decimal: 6,
    symbol: 'SOL',
    assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
    name: 'Wrapped Solana',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
  },
  {
    balance: new BN(100).mul(new BN(126)),
    decimal: 6,
    symbol: 'BTC',
    assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    name: 'BTC',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
  },
  {
    balance: new BN(10).mul(new BN(5342)),
    decimal: 6,
    symbol: 'USDC',
    assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    name: 'USD coin',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
  }
]

storiesOf('position/newPosition', module).add('new', () => (
  <div style={{ backgroundColor: '#000000', padding: 20, width: 'fit-content' }}>
    <NewPosition
      tokens={tokens}
      data={data}
      midPriceIndex={140}
      addLiquidityHandler={() => {}}
      onChangePositionTokens={() => {}}
      isCurrentPoolExisting={true}
      calcCurrentPoolProportion={() => 1}
    />
  </div>
)).add('noPool', () => (
  <div style={{ backgroundColor: '#000000', padding: 20, width: 'fit-content' }}>
    <NewPosition
      tokens={tokens}
      data={data}
      midPriceIndex={140}
      addLiquidityHandler={() => {}}
      onChangePositionTokens={() => {}}
      isCurrentPoolExisting={false}
      calcCurrentPoolProportion={() => 1}
    />
  </div>
))
