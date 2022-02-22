import React from 'react'
import { storiesOf } from '@storybook/react'
import { SelectedFarm } from './SelectedFarm'
storiesOf('farmsList/selectedFarm', module).add('tile', () => {
  return (
    <div style={{ width: 500, height: 500 }}>
      <SelectedFarm
        value={2345.34}
        staked={233345}
        pair={'xBTC - xUSD'}
        rewardsToken={'SNY'}
        currencyPrice={2}
        apy={1}
        liquidity={457}
        action={'stake'}
        onStake={(id: string): void => {
          console.log(id)
        }}
        onUnstake={(id: string): void => {
          console.log(id)
        }}
        onClaimReward={(id: string): void => {
          console.log(id)
        }}
        solImg='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
      />
    </div>
  )
})
