import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ConnectWallet from './ConnectWallet'

storiesOf('modals/newconnectWallet', module).add('default', () => (
  <ConnectWallet
    open={true}
    handleClose={() => {}}
    callDisconect={action('disconnect')}
    anchorEl={null}
  />
))
