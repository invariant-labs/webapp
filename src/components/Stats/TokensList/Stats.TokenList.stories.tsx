import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import TokensList from './TokensList'
import { store } from '@store/index'
import { Provider } from 'react-redux'
import { fn } from '@storybook/test'
import { NetworkType } from '@store/consts/static'

const meta = {
  title: 'Stats/TokensList',
  component: TokensList,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <div style={{ width: '1000px' }}>
            <Story />
          </div>
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof TokensList>

export default meta
type Story = StoryObj<typeof meta>

const tokensList = [
  {
    icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    name: 'Wrapped SOL',
    symbol: 'SOL',
    price: 123.321321452,
    priceChange: 0.123,
    volume: 421323423.23,
    tvl: 32065.79898800001,
    tokenDetails: {
      address: '5Dvb5E8zKU4E9c7YxfNL5VC8YQj4VAFUTCGYY9ayFLnnY3UA',
      chainId: 101,
      decimals: 6,
      name: 'USD Coin',
      symbol: 'USDC',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
      tags: ['old-registry', 'solana-fm'],
      extensions: { coingeckoId: 'usd-coin' },
      coingeckoId: 'usd-coin'
    },
    volume24: 841.2384
  },
  {
    icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg',
    name: 'USDT',
    symbol: 'USDT',
    price: 1.321452,
    priceChange: 2,
    volume: 421323423.23,
    tvl: 234413532.43,
    tokenDetails: {
      address: '5Dvb5E8zKU4E9c7YxfNL5VC8YQj4VAFUTCGYY9ayFLnnY3UA',
      chainId: 101,
      decimals: 9,
      name: 'Wrapped SOL',
      symbol: 'SOL',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      tags: ['old-registry'],
      extensions: { coingeckoId: 'wrapped-solana' },
      coingeckoId: 'wrapped-solana'
    },
    volume24: 21.2384
  },
  {
    icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    name: 'USD Coin',
    symbol: 'USDC',
    price: 1.0,
    priceChange: 0.83,
    volume: 421323423.23,
    tvl: 234413532.43,
    tokenDetails: {
      address: '5Dvb5E8zKU4E9c7YxfNL5VC8YQj4VAFUTCGYY9ayFLnnY3UA',
      chainId: 101,
      decimals: 9,
      name: 'Wrapped SOL',
      symbol: 'SOL',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      tags: ['old-registry'],
      extensions: { coingeckoId: 'wrapped-solana' },
      coingeckoId: 'wrapped-solana'
    },
    volume24: 8241.2384
  }
]

export const Primary: Story = {
  args: {
    initialLength: 2,
    data: tokensList.map(tokenData => ({
      icon: tokenData.tokenDetails.logoURI,
      name: tokenData.tokenDetails.name,
      symbol: tokenData.tokenDetails.symbol,
      price: tokenData.price,
      priceChange: tokenData.priceChange,
      volume: tokenData.volume24,
      TVL: tokenData.tvl,
      isUnknown: true,
      address: tokenData.tokenDetails.address.toString()
    })),
    copyAddressHandler: fn(),
    network: NetworkType.Mainnet,
    isLoading: false
  }
}
