import type { Meta, StoryObj } from '@storybook/react'
import SelectChain from './SelectChain'
import { MemoryRouter } from 'react-router-dom'
import { fn } from '@storybook/test'
import { Chain } from '@store/consts/types'

const meta = {
  title: 'Modals/SelectChain',
  component: SelectChain,
  args: {
    onSelect: fn(),
    handleClose: fn(),
    open: true,
    activeChain: { address: '123', name: Chain.Alephium },
    chains: [
      { address: '123', name: Chain.Alephium },
      { address: '123', name: Chain.AlephZero }
    ],
    anchorEl: null
  },
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof SelectChain>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: args => {
    return <SelectChain {...args} />
  },
  args: {}
}
