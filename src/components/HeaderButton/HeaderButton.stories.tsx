import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { toBlur } from '@consts/uiUtils'
import { Typography } from '@material-ui/core'
import { colors } from '@static/theme'
import SelectNetworkButton from './SelectNetworkButton'
import ChangeWalletButton from './ChangeWalletButton'
import { NetworkType, SolanaNetworks } from '@consts/static'
import SelectRPCButton from './SelectRPCButton'
import SelectPriorityButton from './SelectPriorityButton'

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

storiesOf('buttons/newHeaderButton', module)
  .addDecorator(withKnobs)
  .add('selectWallet', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <ChangeWalletButton
        name='Open Dropdown'
        connected={false}
        onConnect={() => action('connect')}
        onDisconnect={action('disconnect')}
      />
      <br />
      <div id={toBlur} style={{ color: '#00F9BB' }}>
        <Typography variant='body2'>{loremIpsum}</Typography>
      </div>
    </div>
  ))
  .add('setPriority', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <SelectPriorityButton
        content='Set priority'
        open={true}
        onClick={() => {}}
        handleClose={() => {}}
        anchorEl={null}
      />
      <br />
      <div id={toBlur} style={{ color: '#00F9BB' }}>
        <Typography variant='body2'>{loremIpsum}</Typography>
      </div>
    </div>
  ))
  .add('withDisconnect', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <ChangeWalletButton
        name='Open Dropdown'
        connected={true}
        onConnect={() => action('connect')}
        onDisconnect={action('disconnect')}
      />
      <br />
      <div id={toBlur} style={{ color: '#00F9BB' }}>
        <Typography variant='body2'>{loremIpsum}</Typography>
      </div>
    </div>
  ))
  .add('selectNetwork', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <SelectNetworkButton
        name={NetworkType.DEVNET}
        networks={[
          { networkType: NetworkType.DEVNET, rpc: SolanaNetworks.DEV },
          { networkType: NetworkType.MAINNET, rpc: SolanaNetworks.MAIN }
        ]}
        onSelect={(networkType, rpc) => action('chosen: ' + networkType + ' ' + rpc)()}
      />
    </div>
  ))
  .add('selectRPC', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <SelectRPCButton
        rpc={SolanaNetworks.MAIN_NIGHTLY}
        networks={[
          {
            networkType: NetworkType.MAINNET,
            rpc: SolanaNetworks.MAIN_NIGHTLY,
            rpcName: 'Nightly'
          },
          { networkType: NetworkType.MAINNET, rpc: SolanaNetworks.MAIN, rpcName: 'Solana' },
          {
            networkType: NetworkType.MAINNET,
            rpc: SolanaNetworks.MAIN_SERUM,
            rpcName: 'Serum'
          },
          {
            networkType: NetworkType.MAINNET,
            rpc: SolanaNetworks.MAIN_GENESYSGO,
            rpcName: 'GenesysGo'
          }
        ]}
        onSelect={(networkType, rpc) => action('chosen: ' + networkType + ' ' + rpc)()}
      />
    </div>
  ))
