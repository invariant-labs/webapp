import { MemoryRouter } from 'react-router-dom'
import { NoConnected } from './NoConnected'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'NoConnected',
  component: NoConnected,
  decorators: [
    Story => (
      <MemoryRouter>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
            backgroundColor: '#f0f0f0'
          }}>
          <Story />
        </div>
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof NoConnected>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onConnect: () => {},
    descCustomText: 'You have no positions.'
  }
}
