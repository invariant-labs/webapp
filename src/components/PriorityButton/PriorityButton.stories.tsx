import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import PriorityButton from './PriorityButton'

storiesOf('buttons/priorityButton', module)
  .addDecorator(withKnobs)
  .add('set priority', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <PriorityButton content='Set priority' onClick={() => {}} />
    </div>
  ))
