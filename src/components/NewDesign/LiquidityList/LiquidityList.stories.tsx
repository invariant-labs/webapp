import React from 'react'
import { storiesOf } from '@storybook/react'
import { LiquidityList } from './LiquidityList'

storiesOf('liquidityPosition/list', module).add('default', () => {
  return <LiquidityList />
})
