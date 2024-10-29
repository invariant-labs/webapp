import type { Meta, StoryObj } from '@storybook/react'
import Button from './NavbarButton'

const meta = {
  title: 'Buttons/NavbarButton',
  component: Button
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    name: 'Test Button'
  }
}
