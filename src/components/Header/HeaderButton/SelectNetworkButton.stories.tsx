import type { Meta, StoryObj } from '@storybook/react'
import SelectNetworkButton from './SelectNetworkButton'
import { NetworkType, RPC } from '@store/consts/static'
import { action } from '@storybook/addon-actions'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Buttons/SelectNetworkButton',
  component: SelectNetworkButton,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof SelectNetworkButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => {
    const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>(NetworkType.Testnet)

    const handleSelectNetwork = (networkType: NetworkType, rpc: string) => {
      setSelectedNetwork(networkType)
      action('chosen: ' + networkType + ' ' + rpc)()
    }

    return (
      <SelectNetworkButton
        name={selectedNetwork}
        networks={[
          { networkType: NetworkType.Testnet, rpc: RPC.TEST },
          { networkType: NetworkType.Mainnet, rpc: RPC.MAIN }
        ]}
        onSelect={handleSelectNetwork}
      />
    )
  },
  args: {
    name: NetworkType.Testnet,
    networks: [
      { networkType: NetworkType.Testnet, rpc: RPC.TEST },
      { networkType: NetworkType.Mainnet, rpc: RPC.MAIN }
    ],
    onSelect: action('chosen: ' + NetworkType.Testnet + ' ' + RPC.TEST)
  }
}
