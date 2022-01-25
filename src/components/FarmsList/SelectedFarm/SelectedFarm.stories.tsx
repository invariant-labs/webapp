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
        currency={'SNY'}
        currencyPrice={2}
        apy={1}
        liquidity={457}
        stake={() => {}}
        unstake={() => {}}
        claimRewards={() => {}}
      />
    </div>
  )
})
