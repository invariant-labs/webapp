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

const descr = 'CLICK TO SEE THE DROPDOWN'

storiesOf('test/components/HeaderButtons', module)
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
        <Typography variant='body2'>{descr}</Typography>
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
        <Typography variant='body2'>{descr}</Typography>
      </div>
    </div>
  ))
  .add('selectNetwork', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <SelectNetworkButton
        name={NetworkType.MAINNET}
        networks={[
          { name: NetworkType.DEVNET, network: SolanaNetworks.DEV },
          { name: NetworkType.MAINNET, network: SolanaNetworks.MAIN },
          { name: NetworkType.TESTNET, network: SolanaNetworks.TEST },
          { name: NetworkType.LOCALNET, network: SolanaNetworks.LOCAL }
        ]}
        onSelect={(chosen: string) => action(`chosen: ${chosen}`)()}
      />
    </div>
  ))
