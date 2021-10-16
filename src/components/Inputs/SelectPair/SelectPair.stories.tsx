import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import SelectPair from './SelectPair'

const pairs = [
  {
    symbol1: 'xUSD',
    symbol2: 'USDC'
  },
  {
    symbol1: 'xSOL',
    symbol2: 'WSOL'
  }
]

storiesOf('Inputs/selectPair', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <SelectPair current={null} name='Select&nbsp;pair' pairs={pairs} onSelect={(chosen: number) => action(`chosen pair index: ${chosen}`)()} />
    </div>
  ))
  .add('chosen', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <SelectPair current={{ symbol1: 'USDC', symbol2: 'SNY' }} name='Select&nbsp;pair' pairs={pairs} onSelect={(chosen: number) => action(`chosen pair index: ${chosen}`)()} />
    </div>
  ))
