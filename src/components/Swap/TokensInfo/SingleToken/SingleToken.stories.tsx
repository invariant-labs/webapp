import { store } from '@store/index'
import SingleToken from './SingleToken'
import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { fn } from '@storybook/test'
import { NetworkType } from '@store/consts/static'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

const meta = {
  title: 'Components/SingleToken',
  component: SingleToken,
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
  ],
  args: {
    copyTokenAddressHandler: fn()
  }
} satisfies Meta<typeof SingleToken>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    token: null,
    network: NetworkType.Testnet,
    copyTokenAddressHandler: fn()
  }
}

export const WithToken: Story = {
  args: {
    token: {
      balance: new BN(100).mul(new BN(34786)),
      decimals: 6,
      symbol: 'SOL',
      assetAddress: new PublicKey('So11111111111111111111111111111111111111112'),
      name: 'Wrapped Solana',
      logoURI:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
    },
    network: NetworkType.Testnet
  }
}
