import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Priority, { IPriority } from './Priority'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { store } from '@store/index'
import { PriorityMode } from '@store/consts/types'

const meta = {
  title: 'Modals/Priority',
  component: Priority,
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
    handleClose: fn(),
    open: true
  }
} satisfies Meta<typeof Priority>

export default meta
type Story = StoryObj<typeof meta>

const PrimaryComponent: React.FC<IPriority> = args => {
  return <Priority {...args} />
}

export const Primary: Story = {
  args: {
    handleClose: fn(),
    open: true,
    anchorEl: null,
    onPrioritySave: fn(),
    recentPriorityFee: '1',
    recentPriorityMode: PriorityMode.Dynamic
  },
  render: args => <PrimaryComponent {...args} />
}
