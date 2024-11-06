import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import TokenListItem from './TokenListItem'
import { store } from '@store/index'
import { Provider } from 'react-redux'
import { fn } from '@storybook/test'
import { SortTypeTokenList } from '@store/consts/static'

const meta = {
  title: 'Stats/TokenListItem',
  component: TokenListItem,
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
} satisfies Meta<typeof TokenListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Header: Story = {
  args: {
    displayType: 'header',
    onSort: fn(),
    sortType: SortTypeTokenList.NAME_ASC
  }
}

export const Token: Story = {
  args: {
    displayType: 'token',
    icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    name: 'Wrapped SOL',
    itemNumber: 5,
    volume: 1000000000,
    TVL: 500000000,
    hideBottomLine: false
  }
}
