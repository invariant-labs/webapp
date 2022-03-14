import React from 'react'
import { storiesOf } from '@storybook/react'
import TokensList, { ITokensList } from './TokensList'

storiesOf('stats/TokenList', module).add('Item', () => {
  const tokens: ITokensList = {
    data: [
      {
        icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
        name: 'Wrapped SOL',
        symbol: 'SOL',
        price: 123.321321452,
        priceChange: -2.33,
        volume: 421323423.23,
        TVL: 234413532.43
      },
      {
        icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg',
        name: 'USDT',
        symbol: 'USDT',
        price: 1.321452,
        priceChange: 2.33,
        volume: 421323423.23,
        TVL: 234413532.43
      },
      {
        icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
        name: 'USD Coin',
        symbol: 'USDC',
        price: 1.000000,
        priceChange: 2.33,
        volume: 421323423.23,
        TVL: 234413532.43
      }
    ]
  }
  return <TokensList data={tokens.data} />
})
