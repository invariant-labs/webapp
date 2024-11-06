import type { Meta, StoryObj } from '@storybook/react'
import TransactionDetailsBox from './TransactionDetailsBox'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { BN } from '@project-serum/anchor'

const meta = {
  title: 'Components/TransactionDetailsBox',
  component: TransactionDetailsBox,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <SnackbarProvider maxSnack={99}>
            <Story />
          </SnackbarProvider>
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof TransactionDetailsBox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    exchangeRate: { val: 123, symbol: 'ABC', decimal: 12 },
    slippage: 0.5,
    priceImpact: new BN(1000000000),
    fee: { v: new BN(1000000000) },
    open: true,
    isLoadingRate: false
  },
  render: args => {
    return <TransactionDetailsBox {...args} />
  }
}
