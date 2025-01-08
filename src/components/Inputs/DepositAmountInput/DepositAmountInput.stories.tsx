import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import DepositAmountInput from './DepositAmountInput'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Inputs/DepositAmountInput',
  component: DepositAmountInput,
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
    currency: null,
    setValue: fn(),
    value: '0',
    placeholder: '0.0',
    decimalsLimit: 2,
    tokenPrice: 100,
    balanceValue: '1000',
    priceLoading: false,
    currencyIconSrc: '',
    blocked: false,
    blockerInfo: '',
    onBlur: fn(),
    style: {},
    disabled: false,
    isBalanceLoading: false,
    walletUninitialized: true,
    currencyIsUnknown: true
  }
} satisfies Meta<typeof DepositAmountInput>

export default meta
type Story = StoryObj<typeof meta>

export const Null: Story = {}

export const Btc: Story = {
  render: args => {
    const [value, setValue] = useState('0')
    return (
      <DepositAmountInput
        {...args}
        currency='BTC'
        setValue={setValue}
        value={value}
        currencyIconSrc='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
      />
    )
  }
}
