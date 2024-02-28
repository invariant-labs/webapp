import React from 'react'
import { storiesOf } from '@storybook/react'
import JupiterIndexed from './JupiterIndexed'

storiesOf('modals/jupiterIndexed', module).add('default', () => (
  <JupiterIndexed open={true} handleClose={() => {}} anchorEl={null} />
))
