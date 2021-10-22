import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SelectNetwork, { ISelectNetwork } from './SelectNetwork'
import { NetworkType, SolanaNetworks } from '@consts/static'

const networks: ISelectNetwork[] = [
  { name: NetworkType.MAINNET, network: SolanaNetworks.MAIN },
  { name: NetworkType.DEVNET, network: SolanaNetworks.DEV },
  { name: NetworkType.TESTNET, network: SolanaNetworks.TEST }
]

storiesOf('modals/newselectNetwork', module).add('default', () => (
  <SelectNetwork
    networks={networks}
    open={true}
    handleClose={() => {}}
    onSelect={(selected: string) => action('chosen: ' + selected)()}
    anchorEl={null}
  />
))
