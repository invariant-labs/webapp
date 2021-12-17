import React from 'react'
import { storiesOf } from '@storybook/react'
import { PositionItem } from './PositionItem'
storiesOf('positionsList/item', module)
  .add('item', () => {
    return (
      <PositionItem
        tokenXName={'BTC'}
        tokenYName={'SNY'}
        tokenXIcon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
        tokenYIcon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
        tokenXLiq={5000}
        tokenYLiq={300.20}
        min={2149.6}
        max={149.6}
        fee={0.05}
        value={10000.45}
        id='dd'
      />
    )
  })
