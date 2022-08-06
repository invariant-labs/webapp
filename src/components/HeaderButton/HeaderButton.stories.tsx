import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { toBlur } from '@consts/uiUtils'
import { Typography } from '@material-ui/core'
import { colors } from '@static/theme'
import SelectNetworkButton from './SelectNetworkButton'
import ChangeWalletButton from './ChangeWalletButton'
import { WalletType } from '@web3/wallet'
import { NetworkType, SolanaNetworks } from '@consts/static'

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

storiesOf('buttons/newHeaderButton', module)
  .addDecorator(withKnobs)
  .add('selectWallet', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <ChangeWalletButton
        options={[WalletType.PHANTOM, WalletType.SOLLET, WalletType.MATH]}
        name='Open Dropdown'
        connected={false}
        onSelect={chosen => action(`chosen: ${chosen}`)()}
        onDisconnect={action('disconnect')}
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
        options={[WalletType.PHANTOM, WalletType.SOLLET, WalletType.MATH]}
        name='Open Dropdown'
        connected={true}
        onSelect={chosen => action(`chosen: ${chosen}`)()}
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
        rpc={SolanaNetworks.DEV}
        networks={[
          { networkType: NetworkType.DEVNET, rpc: SolanaNetworks.DEV },
          { networkType: NetworkType.MAINNET, rpc: SolanaNetworks.MAIN }
        ]}
        onSelect={(networkType, rpc) => action('chosen: ' + networkType + ' ' + rpc)()}
      />
    </div>
  ))
