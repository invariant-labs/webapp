import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { DEFAULT_PUBLICKEY, NetworkType, SolanaNetworks } from '@consts/static'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import Header from './Header'
import { toBlur } from '@consts/uiUtils'
import { MemoryRouter } from 'react-router'

storiesOf('ui/newHeader', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      // style for testing only
      <div
        style={{
          background: '#0B090D',
          height: '100vh'
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
            onNetworkSelect={(networkType, rpc) => action('chosen: ' + networkType + ' ' + rpc)()}
            onConnectWallet={() => {
              action('connect')
            }}
            walletConnected={false}
            landing='staking'
            onDisconnectWallet={action('disconnect')}
            typeOfNetwork={NetworkType.DEVNET}
            rpc={SolanaNetworks.DEV}
            defaultMainnetRPC={SolanaNetworks.MAIN_NIGHTLY}
            onFaucet={() => {
              console.log('Faucet')
            }}
            onPrioritySave={() => {}}
            recentPriorityFee=''
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
          height: '100vh'
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
            onNetworkSelect={(networkType, rpc) => action('chosen: ' + networkType + ' ' + rpc)()}
            onConnectWallet={() => {
              action('connect')
            }}
            walletConnected={true}
            landing='staking'
            onDisconnectWallet={action('disconnect')}
            typeOfNetwork={NetworkType.DEVNET}
            rpc={SolanaNetworks.DEV}
            defaultMainnetRPC={SolanaNetworks.MAIN_NIGHTLY}
            onPrioritySave={() => {}}
            recentPriorityFee=''
          />
        </div>
      </div>
    )
  })
