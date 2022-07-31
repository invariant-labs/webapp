import React from 'react'
import { storiesOf } from '@storybook/react'
import ClosePositionWarning from './ClosePositionWarning'

storiesOf('modals/ClosePosition', module).add('default', () => (
  <ClosePositionWarning open={true} onCancel={() => {}} onClose={() => {}} onClaim={() => {}} />
))
