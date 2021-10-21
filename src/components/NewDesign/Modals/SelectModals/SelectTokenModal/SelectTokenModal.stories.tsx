import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import SelectTokenModal from '@components/NewDesign/Modals/SelectModals/SelectTokenModal/SelectTokenModal'
import { action } from '@storybook/addon-actions'

const tokens = 'xSOL xBTC xUSD xFTT xETH'.split(' ').map(symbol => ({ symbol }))
const commonTokens = 'xSNY xBTC xETH DOGE'.split(' ').map(symbol => ({ symbol }))

storiesOf('newModals/selectToken', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <SelectTokenModal
      tokens={tokens}
      commonTokens={commonTokens}
      open={true}
      handleClose={() => {}}
      anchorEl={null}
      onSelect={(chosen: number) => action(`chosen index: ${chosen}`)()}
    />
  ))
