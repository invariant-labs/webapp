import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { DEFAULT_PUBLICKEY, NetworkType } from '@consts/static'
import { toBlur } from '@consts/uiUtils'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'

import { WalletType } from '@web3/wallet'
import { PublicKey } from '@solana/web3.js'

import { Header } from './Header'

//instead of MemoryRouter we could use StoryRouter from 'storybook-react-router'
//But in the hole project MemoryRouter is used instead
storiesOf('test/components/Header', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div
        style={{
          background: '#0b090d',
          height: 'calc(100vh - 70px)'
        }}>
        <div
          id={toBlur}
          style={{
            background:
              'radial-gradient(118.38% 303.54% at 3.96% 118.38%, rgba(119, 72, 216, 0.1) 0%, rgba(119, 72, 216, 0) 100%), radial-gradient(57.34% 103.84% at 50% 0%, rgba(156, 231, 90, 0.1) 0%, rgba(156, 231, 90, 0) 100%)',
            height: '100%'
          }}>
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
            typeOfNetwork={NetworkType.MAINNET}
            onFaucet={() => {
              console.log('Faucet')
            }}
          />
        </div>
      </div>
    )
  })
  .add('connected', () => {
    return (
      <div
        style={{
          background: '#0B090D',
          height: 'calc(100vh - 70px)'
        }}>
        <div
          id={toBlur}
          style={{
            background:
              'radial-gradient(118.38% 303.54% at 3.96% 118.38%, rgba(119, 72, 216, 0.1) 0%, rgba(119, 72, 216, 0) 100%), radial-gradient(57.34% 103.84% at 50% 0%, rgba(156, 231, 90, 0.1) 0%, rgba(156, 231, 90, 0) 100%)',
            height: '100%'
          }}>
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
            typeOfNetwork={NetworkType.MAINNET}
          />
        </div>
      </div>
    )
  })
