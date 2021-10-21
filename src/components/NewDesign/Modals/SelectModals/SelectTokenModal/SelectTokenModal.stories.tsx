import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import SelectTokenModal from '@components/Modals/SelectModals/SelectTokenModal/SelectTokenModal'
import { action } from '@storybook/addon-actions'

const tokens = 'SNY USDC Dogecoin SOL USD FFT ETH 1INCH AAVE AERGO AETH AKRO'.split(' ').map(symbol => ({ symbol }))

storiesOf('modals/selectToken', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <SelectTokenModal
      tokens={tokens}
      open={true}
      handleClose={() => {}}
      anchorEl={null}
      onSelect={(chosen: number) => action(`chosen index: ${chosen}`)()}
    />
  ))
