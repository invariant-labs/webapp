import React from 'react'
import { storiesOf } from '@storybook/react'
import { StakeTile } from './StakeTile'
storiesOf('farmsList/stakeTile', module).add('tile', () => {
  return (
    <div style={{ width: 500, height: 500 }}>
      <StakeTile
        value={2345.34}
        staked={233345}
        pair={'xBTC - xUSD'}
        rewardsToken={'SNY'}
        currencyPrice={2}
        apy={1}
        liquidity={457}
        onStake={(id: string): void => {
          console.log(id)
        }}
      />
    </div>
  )
})
