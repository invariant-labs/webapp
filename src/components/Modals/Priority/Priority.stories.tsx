import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { toBlur } from '@consts/uiUtils'
import React from 'react'
import Priority from './Priority'

storiesOf('newUi/priority', module)
  .addDecorator(withKnobs)
  .add('priority', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <Priority open={true} handleClose={() => {}} anchorEl={null} />
    </div>
  ))
