import type { Meta, StoryObj } from '@storybook/react'
import SelectTestnetRPC from './SelectTestnetRPC'
import { RpcStatus } from '@store/reducers/solanaConnection'
import { NetworkType } from '@store/consts/static'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Modals/SelectTestnetRPC',
  component: SelectTestnetRPC,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ],
  args: {
    activeRPC: 'https://testnet-mock.com',
    anchorEl: null,
    handleClose: () => {},
    networks: [
      {
        networkType: NetworkType.Testnet,
        rpc: 'https://testnet-mock.com',
        rpcName: 'Testnet'
      }
    ],
    onSelect: () => {},
    open: true,
    rpcStatus: RpcStatus.Uninitialized
  }
} satisfies Meta<typeof SelectTestnetRPC>

export default meta
type Story = StoryObj<typeof meta>

export const TestnetPrimary: Story = {}
