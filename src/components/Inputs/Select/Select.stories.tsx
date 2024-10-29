import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Select from './Select'
import { SwapToken } from '@store/selectors/solanaWallet'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { NetworkType } from '@store/consts/static'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'

const tokens: SwapToken[] = [
  {
    balance: new BN(100).mul(new BN(34786)),
    decimals: 6,
    symbol: 'SOL',
    assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
    name: 'Wrapped Solana',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
  },
  {
    balance: new BN(100).mul(new BN(126)),
    decimals: 6,
    symbol: 'BTC',
    assetAddress: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    name: 'BTC',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png'
  },
  {
    balance: new BN(10).mul(new BN(5342)),
    decimals: 6,
    symbol: 'USDC',
    assetAddress: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    name: 'USD coin',
    logoURI:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
  }
]

const meta = {
  title: 'Inputs/Select',
  component: Select,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ],
  args: {}
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    name: 'Select token',
    current: null,
    onSelect: fn(),
    commonTokens: [
      new PublicKey('So11111111111111111111111111111111111111112'),
      new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
      new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
    ],
    handleAddToken: fn(),
    initialHideUnknownTokensValue: false,
    tokens: tokens,
    onHideUnknownTokensChange: fn(),
    centered: false,
    hiddenUnknownTokens: false,
    network: NetworkType.Testnet
  }
}
