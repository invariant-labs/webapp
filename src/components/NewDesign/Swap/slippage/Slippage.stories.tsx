import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { toBlur } from '@consts/uiUtils'
import Slippage from '@components/NewDesign/Swap/slippage/Slippage'
import React from 'react'

storiesOf('newUi/swap', module)
  .addDecorator(withKnobs)
  .add('settings', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <Slippage
        open={true}
        setSlippage={() => {}}
        handleClose={() => {}}
        anchorEl={null}
        defaultSlippage={'1'}
      />
    </div>
  ))
