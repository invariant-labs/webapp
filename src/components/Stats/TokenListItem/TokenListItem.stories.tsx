import React from 'react'
import { storiesOf } from '@storybook/react'
import TokenListItem from '@components/Stats/TokenListItem/TokenListItem'

storiesOf('stats/TokenListItem', module)
  .add('Item', () => {
    return (
      <TokenListItem
        displayType='tokens'
        itemNumber={1}
        icon='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
        name='Solana'
        symbol='SOL'
        price={0.000001}
        priceChange={2.32}
        volume={4324234234}
        TVL={34312345423}
      />
    )
  })
  .add('Header', () => {
    return (
      <TokenListItem
        displayType='header'
      />
    )
  })
