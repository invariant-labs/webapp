import { store } from '@store/index'
import { RpcErrorModal } from './RpcErrorModal'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Modals/RpcErrorModal',
  component: RpcErrorModal,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof RpcErrorModal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    rpcAddress: 'https://rpc-mainnet.maticvigil.com/',
    useCurrentRpc: fn(),
    useDefaultRpc: fn()
  }
}
