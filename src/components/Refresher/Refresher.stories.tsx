import { Refresher } from './Refresher'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  title: 'Components/Refresher',
  component: Refresher
} satisfies Meta<typeof Refresher>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    currentIndex: 6,
    maxIndex: 10,
    onClick: fn()
  }
}
