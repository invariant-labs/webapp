import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import AnimateButton from '@components/NewDesign/AnimatedButton/AnimatedButton'
import { colors } from '@static/theme'

storiesOf('buttons/AnimatedButtons', module)
  .addDecorator(withKnobs)
  .add('primary', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <AnimateButton content={'test'} />
    </div>
  ))
