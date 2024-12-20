import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import PoolListItem from './PoolListItem'
import { store } from '@store/index'
import { Provider } from 'react-redux'
import { fn } from '@storybook/test'
import { NetworkType, SortTypePoolList } from '@store/consts/static'

const meta = {
  title: 'Stats/PoolListItem',
  component: PoolListItem,
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
} satisfies Meta<typeof PoolListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Header: Story = {
  args: {
    displayType: 'header',
    onSort: fn(),
    sortType: SortTypePoolList.TVL_DESC,
    network: NetworkType.Mainnet,
    showAPY: true
  }
}

export const Token: Story = {
  args: {
    displayType: 'token',
    tokenIndex: 1,
    symbolFrom: 'BCT',
    symbolTo: 'USDT',
    iconFrom:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    iconTo:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    fee: 0.3,
    volume: 1000000000,
    TVL: 500000000,
    hideBottomLine: false,
    network: NetworkType.Mainnet,
    showAPY: true
  }
}
