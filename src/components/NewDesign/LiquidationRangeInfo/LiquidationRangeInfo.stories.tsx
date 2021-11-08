import React from 'react'
import { storiesOf } from '@storybook/react'
import LiquidationRangeInfo from '@components/NewDesign/LiquidationRangeInfo/LiquidationRangeInfo'

storiesOf('singlePosition/rightComponent', module)
  .add('rangeInfo', () => {
    const fromToken = 'SNY'
    const toToken = 'xUSD'
    const label = 'MAX'
    const amount = 235

    return (
      <LiquidationRangeInfo
        label={label}
        amount={amount}
        toToken={toToken}
        fromToken={fromToken}/>
    )
  })
