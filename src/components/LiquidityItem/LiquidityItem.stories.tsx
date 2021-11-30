import React from 'react'
import { storiesOf } from '@storybook/react'
import { LiquidityItem } from './LiquidityItem'
storiesOf('liquidityPosition/items', module)
  .add('item', () => {
    return (
      <LiquidityItem
        tokenXName={'BTC'}
        tokenYName={'SNY'}
        tokenXIcon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
        tokenYIcon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
        min={2149.6}
        max={149.6}
        fee={0.05}
      />
    )
  })
