import React from 'react'
import { storiesOf } from '@storybook/react'
import DepositSelector from './DepositSelector'

storiesOf('position/depositSelector', module).add('deposit', () => (
  <DepositSelector
    tokens={[]}
    setPositionTokens={() => {}}
    setFeeValue={() => {}}
    onAddLiquidity={() => {}}
    token1Max={5}
    token2Max={20}
    token1InputState={{
      blocked: false
    }}
    token2InputState={{
      blocked: true,
      blockerInfo: 'Select token.'
    }}
    leftRangeTickIndex={100}
    rightRangeTickIndex={200}
    calcCurrentPoolProportion={() => 1}
  />
))
