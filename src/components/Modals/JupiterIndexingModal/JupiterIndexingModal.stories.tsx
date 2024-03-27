import React from 'react'
import { storiesOf } from '@storybook/react'
import JupiterIndexingModal from './JupiterIndexingModal'

storiesOf('modals/JupiterIndexingModal', module).add('default', () => (
  <JupiterIndexingModal open={true} handleClose={() => {}} anchorEl={null} isActive={false} />
))
