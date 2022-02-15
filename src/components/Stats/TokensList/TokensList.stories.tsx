import React from 'react'
import { storiesOf } from '@storybook/react'
import TokensList, { ITokensList } from './TokensList'
import { BN } from '@project-serum/anchor'

storiesOf('stats/TokenList', module).add('Item', () => {
  const tokens: ITokensList = {
    data: [
      {
        icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
        name: 'Wrapped SOL',
        symbol: 'SOL',
        price: new BN(123321321452),
        decimals: 9,
        priceChange: '-2.33',
        volume: '421,323,423.23',
        TVL: '234,413,532.43'
      },
      {
        icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg',
        name: 'USDT',
        symbol: 'USDT',
        price: new BN(1321452),
        decimals: 6,
        priceChange: '2.33',
        volume: '421,323,423.23',
        TVL: '234,413,532.43'
      },
      {
        icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
        name: 'USD Coin',
        symbol: 'USDC',
        price: new BN(1000000),
        decimals: 6,
        priceChange: '2.33',
        volume: '421,323,423.23',
        TVL: '234,413,532.43'
      }
    ]
  }
  return <TokensList data={tokens.data} />
})
