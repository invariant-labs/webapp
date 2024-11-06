import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import ExchangeAmountInput from './ExchangeAmountInput'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'
import { SwapToken } from '@store/selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import { NetworkType } from '@store/consts/static'
import { BN } from '@project-serum/anchor'

const tokens: Record<string, SwapToken> = {
  So11111111111111111111111111111111111111112: {
    balance: new BN(100).mul(new BN(34786)),
    decimals: 6,
    symbol: 'SOL',
    assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
    name: 'Wrapped Solana',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
  },
  '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E': {
    balance: new BN(100).mul(new BN(126)),
    decimals: 6,
    symbol: 'BTC',
    assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    name: 'BTC',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
  },
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
    balance: new BN(10).mul(new BN(5342)),
    decimals: 6,
    symbol: 'USDC',
    assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    name: 'USD coin',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
  }
}

const meta = {
  title: 'Inputs/ExchangeAmountInput',
  component: ExchangeAmountInput,
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
    error: null,
    className: '',
    decimal: 2,
    placeholder: '0.0',
    onMaxClick: fn(),
    current: null,
    tokens: tokens,
    onSelect: fn(),
    disabled: false,
    balance: '1000',
    hideBalances: false,
    handleAddToken: fn(),
    commonTokens: [],
    limit: undefined,
    initialHideUnknownTokensValue: false,
    onHideUnknownTokensChange: fn(),
    tokenPrice: 100,
    priceLoading: false,
    isBalanceLoading: false,
    showMaxButton: true,
    showBlur: false,
    hiddenUnknownTokens: false,
    network: NetworkType.Testnet,
    percentageChange: 0
  }
} satisfies Meta<typeof ExchangeAmountInput>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    value: '0',
    setValue: fn()
  },
  render: args => {
    const [value, setValue] = useState('0')
    return <ExchangeAmountInput {...args} setValue={setValue} value={value} tokens={tokens} />
  }
}

export const WithError: Story = {
  args: {
    value: '0',
    setValue: fn(),
    error: 'Invalid amount'
  },
  render: args => {
    const [value, setValue] = useState('0')
    return <ExchangeAmountInput {...args} setValue={setValue} value={value} />
  }
}
