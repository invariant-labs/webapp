import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import SelectPairModal from './SelectPairModal'
import { action } from '@storybook/addon-actions'

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

storiesOf('modals/selectPair', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <SelectPairModal
      pairs={pairs}
      open={true}
      handleClose={() => {}}
      anchorEl={null}
      onSelect={(chosen: number) => action(`chosen pair index: ${chosen}`)()}
    />
  ))
