import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import IDO from './IDO'
import React from 'react'
import { toBlur } from '@consts/uiUtils'

storiesOf('newUi/IDO', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <IDO />
    </div>
  ))