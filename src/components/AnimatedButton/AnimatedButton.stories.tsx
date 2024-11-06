import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import AnimatedButton from './AnimatedButton'

const meta = {
  title: 'Buttons/AnimatedButton',
  component: AnimatedButton,
  args: { onClick: fn(), content: 'Test Button', sx: { width: '300px' } }
} satisfies Meta<typeof AnimatedButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    progress: 'none'
  }
}
export const Progress: Story = {
  args: {
    progress: 'progress'
  }
}

export const Success: Story = {
  args: { progress: 'success' }
}

export const Failed: Story = {
  args: { progress: 'failed' }
}
