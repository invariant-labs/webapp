import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import RoutesModal from './RoutesModal'
import { MemoryRouter } from 'react-router-dom'
import { fn } from '@storybook/test'

const meta = {
  title: 'Modals/Routes',
  component: RoutesModal,
  args: {
    anchorEl: null
  },
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof RoutesModal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: args => {
    const [currentRoute, setCurrentRoute] = useState(args.current)

    const handleSelectRoute = (selected: string) => {
      setCurrentRoute(selected)
      args.onSelect(selected)
    }

    return <RoutesModal {...args} current={currentRoute} onSelect={handleSelectRoute} />
  },
  args: {
    onSelect: fn(),
    handleClose: fn(),
    open: true,
    routes: ['exchange', 'liquidity', 'statistics']
  }
}

Primary.args = {
  anchorEl: null,
  handleClose: fn(),
  open: true,
  onSelect: fn(),
  routes: ['exchange', 'liquidity', 'statistics'],
  current: 'exchange',
  onRPC: fn(),
  onFaucet: fn()
}
