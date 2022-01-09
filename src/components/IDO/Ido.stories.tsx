import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import Ido from './Ido'
import React from 'react'
import { toBlur } from '@consts/uiUtils'

storiesOf('newUi/ido', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <Ido />
    </div>
  ))
