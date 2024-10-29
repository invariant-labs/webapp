import LiquidationRangeInfo from './LiquidationRangeInfo'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Components/LiquidationRangeInfo',
  component: LiquidationRangeInfo,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof LiquidationRangeInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    amount: 123,
    label: 'MAX',
    tokenX: 'BTC',
    tokenY: 'ETH'
  }
}
