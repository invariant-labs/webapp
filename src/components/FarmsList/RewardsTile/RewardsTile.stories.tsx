import React from 'react'
import { storiesOf } from '@storybook/react'
import { RewardsTile } from './RewardsTile'
storiesOf('farmsList/rewardsTile', module)
  .add('tile', () => {
    return (
      <div style={{ width: 500, height: 500 }}>
        <RewardsTile
          tokenXSymbol='BTC'
          tokenYSymbol='SOL'
          tokenXDecimals={9}
          tokenYDecimals={6}
          minPrice={2}
          maxPrice={5.005}
          tokenXDeposit={2137}
          tokenYDeposit={911}
          valueX={5184}
          valueY={2137}
          rewardSymbol={'SNY'}
          rewardDecimals={7}
          onClaimReward={() => {
            console.log('reward')
          }}
          rewardIcon={
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
          }
          rewardValue={2137}
          xToY
          showRewardsLoader={false}
          apy={21.37}
          isLoadingApy={false}
          dailyReward={9}
        />
      </div>
    )
  })
  .add('loader', () => {
    return (
      <div style={{ width: 500, height: 500 }}>
        <RewardsTile
          tokenXSymbol='BTC'
          tokenYSymbol='SOL'
          tokenXDecimals={9}
          tokenYDecimals={6}
          minPrice={2}
          maxPrice={5.005}
          tokenXDeposit={2137}
          tokenYDeposit={911}
          valueX={5184}
          valueY={2137}
          rewardSymbol={'SNY'}
          rewardDecimals={7}
          onClaimReward={() => {
            console.log('reward')
          }}
          rewardIcon={
            'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
          }
          rewardValue={2137}
          xToY
          showRewardsLoader
          apy={21.37}
          isLoadingApy={false}
          dailyReward={9}
        />
      </div>
    )
  })
