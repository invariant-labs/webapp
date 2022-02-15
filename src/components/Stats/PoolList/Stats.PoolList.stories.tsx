import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import PoolList from './PoolList'

storiesOf('stats/PoolList', module)
  .addDecorator(withKnobs)
  .add('Pools', () => {
    const data = Array(40)
      .fill(0)
      .map(() => {
        return {
          symbolFrom: 'BTC',
          symbolTo: 'xBTC',
          fee: '0.05',
          volume: '9,242,263,567.34',
          TVL: '$242,263,567.34'
        }
      })

    return <PoolList data={data} />
  })
