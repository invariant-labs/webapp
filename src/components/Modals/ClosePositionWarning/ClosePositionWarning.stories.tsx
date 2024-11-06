import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import ClosePositionWarning from './ClosePositionWarning'

const meta = {
  title: 'Modals/ClosePositionWarning',
  component: ClosePositionWarning,
  args: {}
} satisfies Meta<typeof ClosePositionWarning>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    open: true,
    onCancel: fn(),
    onClaim: fn(),
    onClose: fn()
  }
}
