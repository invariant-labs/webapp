import React from 'react'
import { storiesOf } from '@storybook/react'
import { JupiterIndexedModal } from './JupiterIndexedModal'

storiesOf('modals/JupiterIndexedModal', module).add('default', () => (
  <JupiterIndexedModal isOpen={true} hasError={false} handleClose={() => {}} isIndexed={true} />
))
