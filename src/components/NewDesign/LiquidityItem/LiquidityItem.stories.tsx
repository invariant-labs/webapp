import React from 'react'
import { storiesOf } from '@storybook/react'
import { LiquidityItem } from './LiquidityItem'
storiesOf('liquidityPosition/items', module)
  .add('item', () => {
    return (
      <LiquidityItem
        nameToSwap={'BTC'}
        nameFromSwap={'SNY'}
        iconToSwap='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
        iconFromSwap='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
        min={2149.6}
        max={149.6}
        fee={0.05}
      />
    )
  })
