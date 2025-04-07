import { MemoryRouter } from 'react-router-dom'
import { OutlinedButton } from './OutlinedButton'

import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Provider } from 'react-redux'
import { store } from '@store/index'

const meta = {
  title: 'Buttons/OutlinedButton',
  component: OutlinedButton,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof OutlinedButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    name: 'Connect button',
    onClick: fn(),
    disabled: false
  }
}
