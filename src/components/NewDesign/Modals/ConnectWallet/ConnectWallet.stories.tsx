import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ConnectWallet from './ConnectWallet'
import { WalletType } from '@web3/wallet'

storiesOf('modals/connectWallet', module)
  .add('default', () => (
    <ConnectWallet
      open={true}
      options={[WalletType.PHANTOM, WalletType.SOLLET, WalletType.MATH]}
      handleClose={() => {}}
      callDisconect={action('disconnect')}
      connected={false}
      anchorEl={null}
      onSelect={(wallet) => action(`chosen: ${wallet}`)()}
    />
  ))
  .add('withDisconnect', () => (
    <ConnectWallet
      open={true}
      options={[WalletType.PHANTOM, WalletType.SOLLET, WalletType.MATH]}
      handleClose={() => {}}
      callDisconect={action('disconnect')}
      connected={true}
      anchorEl={null}
      onSelect={(wallet) => action(`chosen: ${wallet}`)()}
    />
  ))
