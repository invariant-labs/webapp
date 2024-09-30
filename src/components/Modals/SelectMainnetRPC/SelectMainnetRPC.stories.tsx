import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SelectMainnetRPC from './SelectMainnetRPC'
import { NetworkType, SolanaNetworks } from '@consts/static'
import { ISelectNetwork } from '../SelectNetwork/SelectNetwork'
import { RpcStatus } from '@reducers/solanaConnection'

const networks: ISelectNetwork[] = [
  {
    networkType: NetworkType.MAINNET,
    rpc: SolanaNetworks.MAIN_HELIUS,
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
]

storiesOf('modals/selectMainnetRpc', module).add('default', () => (
  <SelectMainnetRPC
    networks={networks}
    open={true}
    handleClose={() => {}}
    onSelect={(networkType, rpc) => action('chosen: ' + networkType + ' ' + rpc)()}
    anchorEl={null}
    activeRPC={SolanaNetworks.MAIN_SERUM}
    rpcStatus={RpcStatus.Uninitialized}
  />
))
