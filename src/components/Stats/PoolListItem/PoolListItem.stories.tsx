import React from 'react'
import { storiesOf } from '@storybook/react'
import PoolListItem from './PoolListItem'

storiesOf('stats/PoolListItem', module)
  .add('Header', () => {
    return <PoolListItem displayType='header' />
  })
  .add('token', () => {
    return (
      <PoolListItem
        displayType='token'
        symbolFrom='BCT'
        symbolTo='USDT'
        iconFrom='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
        iconTo='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg'
        volume={421323423.23}
        TVL={234413532.43}
        fee={0.05}
        apy={300}
        apyData={{
          Fees: 300
        }}
      />
    )
  })
