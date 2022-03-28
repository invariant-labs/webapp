import React from 'react'
import { storiesOf } from '@storybook/react'
import SimpleInput from './SimpleInput'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'

storiesOf('inputs/simple', module)
  .addDecorator(withKnobs)
  .add('token', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <SimpleInput setValue={() => {}} decimal={6} placeholder={'0.0'} />
    </div>
  ))
