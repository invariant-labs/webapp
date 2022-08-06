import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SelectNetwork, { ISelectNetwork } from './SelectNetwork'
import { NetworkType, SolanaNetworks } from '@consts/static'

const networks: ISelectNetwork[] = [
  { networkType: NetworkType.MAINNET, rpc: SolanaNetworks.MAIN },
  { networkType: NetworkType.DEVNET, rpc: SolanaNetworks.DEV },
  { networkType: NetworkType.TESTNET, rpc: SolanaNetworks.TEST }
]

storiesOf('modals/newSelectNetwork', module).add('default', () => (
  <SelectNetwork
    networks={networks}
    open={true}
    handleClose={() => {}}
    onSelect={(selected: string) => action('chosen: ' + selected)()}
    anchorEl={null}
    active={NetworkType.TESTNET}
  />
))
