import React from 'react'
import { storiesOf } from '@storybook/react'
import LiquidationRangeInfo from '@components/LiquidationRangeInfo/LiquidationRangeInfo'

storiesOf('singlePosition/rightComponent', module)
  .add('rangeInfo', () => {
    const fromToken = 'SNY'
    const toToken = 'xUSD'
    const label = 'MAX'
    const amount = 235

    return (
      <div style={{ width: 228 }}>
        <LiquidationRangeInfo
          label={label}
          amount={amount}
          toToken={toToken}
          fromToken={fromToken}/>
      </div>
    )
  })
