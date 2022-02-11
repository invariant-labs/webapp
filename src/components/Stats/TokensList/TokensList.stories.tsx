import React from 'react'
import { storiesOf } from '@storybook/react'
import TokensList from './TokensList'
import { ITokensList } from './TokensList'
import { BN } from '@project-serum/anchor'

storiesOf('stats/TokenList', module).add('Item', () => {
  const tokens: ITokensList = {
    data: [
      {
        icon: 'BTC',
        name: 'Bitcoin',
        symbol: 'BTC',
        price: new BN(4242575826489),
        decimals: 9,
        priceChange: '2.33',
        volume: '421,323,423.23',
        TVL: '234,413,532.43'
      },
      {
        icon: 'ETH',
        name: 'Ethereum',
        symbol: 'ETH',
        price: new BN(3421321321452),
        decimals: 9,
        priceChange: '-2.33',
        volume: '421,323,423.23',
        TVL: '234,413,532.43'
      },
      {
        icon: 'SOL',
        name: 'Solana',
        symbol: 'SOL',
        price: new BN(123321321452),
        decimals: 9,
        priceChange: '-2.33',
        volume: '421,323,423.23',
        TVL: '234,413,532.43'
      },
      {
        icon: 'SNY',
        name: 'Synthetify',
        symbol: 'SNY',
        price: new BN(1321452),
        decimals: 6,
        priceChange: '-2.33',
        volume: '421,323,423.23',
        TVL: '234,413,532.43'
      },
      {
        icon: 'NEAR',
        name: 'Near',
        symbol: 'NEAR',
        price: new BN(3221452),
        decimals: 6,
        priceChange: '2.33',
        volume: '421,323,423.23',
        TVL: '234,413,532.43'
      }
    ]
  }
  let a = 9
  return <TokensList data={tokens.data} />
})
