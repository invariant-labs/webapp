import React from 'react'
import { storiesOf } from '@storybook/react'
import { RewardsTile } from './RewardsTile'
storiesOf('farmsList/rewardsTile', module).add('tile', () => {
  return (
    <div style={{ width: 500, height: 500 }}>
      <RewardsTile
        tokenXSymbol='BTC'
        tokenYSymbol='SOL'
        minPrice={2}
        maxPrice={5.005}
        fee={0.3}
        tokenXDeposit={2137}
        tokenYDeposit={911}
        value={5184}
        rewardSymbol={'SNY'}
        onClaimReward={() => {
          console.log('reward')
        }}
        rewardIcon={
          'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
        }
        rewardValue={2137}
      />
    </div>
  )
})
