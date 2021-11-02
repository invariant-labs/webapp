import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import PositionSettings from './PositionSettings'

storiesOf('modals/positionSettings', module)
  .add('default', () => (
    <PositionSettings
      open={true}
      handleClose={() => {}}
      anchorEl={null}
      slippageTolerance={0.5}
      onChangeSlippageTolerance={() => {}}
      autoSetSlippageTolerance={() => {}}
    />
  ))
