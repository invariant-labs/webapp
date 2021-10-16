import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { DEFAULT_PUBLICKEY, NetworkType } from '@consts/static'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import Header from './Header'
import { toBlur } from '@consts/uiUtils'
import { WalletType } from '@web3/wallet'
import { MemoryRouter } from 'react-router'

storiesOf('ui/Header', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div id={toBlur}>
        <Header
          address={DEFAULT_PUBLICKEY}
          onNetworkSelect={(chosen: string) => {
            action(`network changed to: ${chosen}`)()
          }}
          onWalletSelect={(chosen: WalletType) => {
            action(`wallet changed to: ${chosen}`)()
          }}
          walletConnected={false}
          landing='staking'
          onDisconnectWallet={action('disconnect')}
          typeOfNetwork={NetworkType.DEVNET}
        />
      </div>
    )
  })
  .add('connected', () => {
    return (
      <div id={toBlur}>
        <Header
          address={new PublicKey(42)}
          onNetworkSelect={(chosen: string) => {
            action(`network changed to: ${chosen}`)()
          }}
          onWalletSelect={(chosen: WalletType) => {
            action(`wallet changed to: ${chosen}`)()
          }}
          walletConnected={true}
          landing='staking'
          onDisconnectWallet={action('disconnect')}
          typeOfNetwork={NetworkType.DEVNET}
        />
      </div>
    )
  })
