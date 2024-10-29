import type { Meta, StoryObj } from '@storybook/react'
import TokensInfo from './TokensInfo'
import { fn } from '@storybook/test'
import { NetworkType, SOL_DEV, USDT_DEV } from '@store/consts/static'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Components/TokensInfo',
  component: TokensInfo,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof TokensInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    copyTokenAddressHandler: fn(),
    tokenFrom: {
      balance: 234234000343400000,
      symbol: USDT_DEV.symbol,
      assetAddress: USDT_DEV.address,
      name: USDT_DEV.name,
      logoURI: USDT_DEV.logoURI,
      decimals: USDT_DEV.decimals,
      isUnknown: false
    },
    tokenTo: {
      balance: 23435345450000400,
      symbol: SOL_DEV.symbol,
      assetAddress: SOL_DEV.address,
      name: SOL_DEV.name,
      logoURI: SOL_DEV.logoURI,
      decimals: SOL_DEV.decimals,
      isUnknown: false
    },
    tokenFromPrice: 53433,
    tokenToPrice: 3243,
    network: NetworkType.Testnet
  },
  render: args => {
    return <TokensInfo {...args} />
  }
}
