import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import IDOInput from './IDOInput'

storiesOf('inputs/IDOInput', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <IDOInput
      value={0.000001}
      balanceValue={'102 460.3445'}
      changePercent={-4.14}
      bigNumberRightBottom={'205 341.4361'}
      onMaxClick={() => {}}
    />
  ))
