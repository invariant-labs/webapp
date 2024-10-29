import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Header from './Header'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { RpcStatus } from '@store/reducers/solanaConnection'
import { Chain } from '@store/consts/types'
import { PublicKey } from '@solana/web3.js'
import { NetworkType, RPC } from '@store/consts/static'

const meta = {
  title: 'Layout/Header',
  component: Header,
  args: {},
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    address: new PublicKey(42),
    defaultTestnetRPC: RPC.TEST,
    landing: 'exchange',
    onConnectWallet: fn(),
    onDisconnectWallet: fn(),
    onNetworkSelect: fn(),
    rpc: RPC.TEST,
    typeOfNetwork: NetworkType.Testnet,
    walletConnected: true,
    onFaucet: fn(),
    onCopyAddress: fn(),
    onChangeWallet: fn(),
    activeChain: {
      name: Chain.Eclipse,
      address: 'https://exlipse.invariant.app'
    },
    onChainSelect: fn(),
    network: NetworkType.Testnet,
    defaultDevnetRPC: RPC.DEV_EU,
    rpcStatus: RpcStatus.Uninitialized
  }
}
