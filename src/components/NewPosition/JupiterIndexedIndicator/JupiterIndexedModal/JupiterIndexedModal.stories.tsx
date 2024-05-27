import React from 'react'
import { storiesOf } from '@storybook/react'
import { JupiterIndexedModal } from '@components/NewPosition/JupiterIndexedIndicator/JupiterIndexedModal/JupiterIndexedModal'

storiesOf('modals/jupiterIndexedModal', module).add('default', () => (
  <JupiterIndexedModal open={true} hasError={false} handleClose={() => {}} status={true} />
))
