import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import TransactionPriorityButton from './TransactionPriorityButton'
import { store } from '@store/index'
import { Provider } from 'react-redux'
import { fn } from '@storybook/test'

const meta = {
  title: 'Buttons/TransactionPriorityButton',
  component: TransactionPriorityButton,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof TransactionPriorityButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    areButtonsSelected: false,
    description: 'mocked description',
    index: 1,
    label: 'mocked label',
    onClick: fn(),
    saveValue: 8,
    selected: false,
    value: 3
  }
}
