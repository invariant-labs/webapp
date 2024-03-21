import React from 'react'
import { storiesOf } from '@storybook/react'
import { JupiterIndexing, IndexPoolState } from './JupiterIndexing'
import { toBlur } from '@consts/uiUtils'

storiesOf('NewUi/JupiterIndexing', module).add('default', () => (
  <div style={{ width: 1000 }} id={toBlur}>
    <JupiterIndexing
      open={true}
      handleClose={() => {}}
      anchorElement={null}
      indexPoolState={IndexPoolState.Active}
    />
  </div>
))
