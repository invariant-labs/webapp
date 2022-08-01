import React from 'react'
import { storiesOf } from '@storybook/react'
import PoolList from './PoolList'

storiesOf('stats/PoolList', module).add('PoolList', () => {
  const [data] = React.useState(
    Array(40)
      .fill({})
      .map(() => {
        return {
          symbolFrom: 'BCT',
          symbolTo: 'USDT',
          iconFrom:
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
          iconTo:
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg',
          volume: 421323423.23,
          TVL: 234413532.43,
          fee: 0.05,
          apy: 3554245444,
          apyData: {
            fees: 21.37,
            accumulatedFarmsAvg: 100,
            accumulatedFarmsSingleTick: 200
          }
        }
      })
  )

  return <PoolList data={data} />
})
