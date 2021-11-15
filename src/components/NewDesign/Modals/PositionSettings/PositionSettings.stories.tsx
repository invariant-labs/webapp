import React from 'react'
import { storiesOf } from '@storybook/react'
import PositionSettings from './PositionSettings'
import { useState } from '@storybook/client-api'

storiesOf('modals/positionSettings', module)
  .add('default', () => {
    const [tolerance, setTolerance] = useState(0.5)
      return (
        <PositionSettings
          open={true}
          handleClose={() => {}}
          anchorEl={null}
          slippageTolerance={tolerance}
          onChangeSlippageTolerance={(val) => { setTolerance(val) }}
          autoSetSlippageTolerance={() => { setTolerance(0.5) }}
        />
      )
    }
  )
