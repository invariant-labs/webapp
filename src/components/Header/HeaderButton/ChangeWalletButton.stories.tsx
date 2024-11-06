import type { Meta, StoryObj } from '@storybook/react'
import ChangeWalletButton from './ChangeWalletButton'
import { fn } from '@storybook/test'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Buttons/ChangeWalletButton',
  component: ChangeWalletButton,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof ChangeWalletButton>

export default meta
type Story = StoryObj<typeof meta>

export const NotConnected: Story = {
  args: {
    name: 'Change Wallet',
    onConnect: fn(),
    connected: false,
    onDisconnect: fn()
  }
}

export const Connected: Story = {
  args: {
    name: 'Change Wallet',
    onConnect: fn(),
    connected: true,
    onDisconnect: fn()
  }
}
