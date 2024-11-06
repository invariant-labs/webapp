import type { Meta, StoryObj } from '@storybook/react'
import Slippage from './Slippage'
import { fn } from '@storybook/test'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Modals/Slippage',
  component: Slippage,
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
    open: true
  }
} satisfies Meta<typeof Slippage>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    anchorEl: null,
    handleClose: fn(),
    initialSlippage: '0,5',
    setSlippage: fn(),
    headerText: 'Slippage tolerance',
    infoText:
      'Slippage tolerance is the maximum percentage difference between the expected price and the price at which the trade is executed. If the price changes by more than this percentage, the transaction will revert.',
    open: true
  }
}
