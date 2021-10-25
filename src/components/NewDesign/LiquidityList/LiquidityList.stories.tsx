import React from 'react'
import { storiesOf } from '@storybook/react'
import { LiquidityList } from './LiquidityList'

storiesOf('liquidityPosition/list', module).add('default', () => {
  return (
    <LiquidityList
      data={[
        {
          active: false,
          name1: 'BTC',
          name2: 'SNY',
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        },
        {
          active: false,
          name1: 'BTC',
          name2: 'SNY',
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        },
        {
          active: false,
          name1: 'BTC',
          name2: 'SNY',
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        },
        {
          active: false,
          name1: 'BTC',
          name2: 'SNY',
          min: 2149.6,
          max: 149.6,
          fee: 0.05
        }
      ]}
    />
  )
})
