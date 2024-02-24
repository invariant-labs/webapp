import React from 'react'
import { storiesOf } from '@storybook/react'
import { IndexPoolModal } from './IndexPoolModal'
import { toBlur } from '@consts/uiUtils'
import { withKnobs } from '@storybook/addon-knobs'

storiesOf('newUi/indexPoolModal', module)
  .addDecorator(withKnobs)
  .add('deafult', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <IndexPoolModal open={true} handleClose={() => {}} anchorEl={null} isIndexActive={true} />
    </div>
  ))
