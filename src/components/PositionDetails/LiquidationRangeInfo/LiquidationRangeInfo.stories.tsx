import React from 'react'
import { storiesOf } from '@storybook/react'
import LiquidationRangeInfo from '@components/PositionDetails/LiquidationRangeInfo/LiquidationRangeInfo'

storiesOf('singlePosition/rightComponent', module).add('rangeInfo', () => {
  const fromToken = 'SNY'
  const toToken = 'xUSD'
  const label = 'MAX'
  const amount = 235

  return (
    <div style={{ width: 228 }}>
      <LiquidationRangeInfo label={label} amount={amount} tokenX={toToken} tokenY={fromToken} />
    </div>
  )
})
