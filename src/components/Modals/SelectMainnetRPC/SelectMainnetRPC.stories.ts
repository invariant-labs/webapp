import type { Meta, StoryObj } from '@storybook/react'
import SelectMainnetRPC from './SelectMainnetRPC'
import { RpcStatus } from '@store/reducers/solanaConnection'
import { NetworkType } from '@store/consts/static'

const meta = {
  title: 'Modals/SelectMainnetRPC',
  component: SelectMainnetRPC,
  args: {
    activeRPC: 'https://mainnet-mock.com',
    anchorEl: null,
    handleClose: () => {},
    networks: [
      {
        networkType: NetworkType.Mainnet,
        rpc: 'https://mainnet-mock.com',
        rpcName: 'Mainnet'
      }
    ],
    onSelect: () => {},
    open: true,
    rpcStatus: RpcStatus.Uninitialized
  }
} satisfies Meta<typeof SelectMainnetRPC>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
