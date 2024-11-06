import type { Meta, StoryObj } from '@storybook/react'
import SelectNetwork from './SelectNetwork'
import { NetworkType } from '@store/consts/static'

const meta = {
  title: 'Modals/SelectNetwork',
  component: SelectNetwork,
  args: {
    activeNetwork: NetworkType.Testnet,
    anchorEl: null,
    handleClose: () => {},
    networks: [
      {
        networkType: NetworkType.Testnet,
        rpc: 'https://testnet-mock.com',
        rpcName: 'Testnet'
      },
      {
        networkType: NetworkType.Devnet,
        rpc: 'https://mock.com',
        rpcName: 'Devnet'
      },
      {
        networkType: NetworkType.Mainnet,
        rpc: 'https://mock.com',
        rpcName: 'Mainnet'
      }
    ],
    onSelect: () => {},
    open: true
  }
} satisfies Meta<typeof SelectNetwork>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
