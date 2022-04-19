import React from 'react'
import { storiesOf } from '@storybook/react'
import { RewardsTile } from './RewardsTile'
storiesOf('farmsList/rewardsTile', module).add('tile', () => {
  return (
    <div style={{ width: 500, height: 500 }}>
      <RewardsTile
        value={2345.34}
        staked={233345}
        pair={'xBTC - xUSD'}
        rewardsToken={'SNY'}
        currencyPrice={2}
        apy={1}
        liquidity={457}
        onClaimReward={(id: string): void => {
          console.log(id)
        }}
        iconTokenX={
          'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
        }
      />
    </div>
  )
})
