import React from 'react'
import { storiesOf } from '@storybook/react'
import AmountInput from './AmountInput'

import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'

storiesOf('inputs/amount', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <AmountInput setValue={() => {}} currency={'xUSD'} placeholder={'0.0'} />
    </div>
  ))
