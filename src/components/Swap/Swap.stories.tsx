import { Status } from '@store/reducers/solanaWallet'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Swap from './Swap'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'
import { NetworkType } from '@store/consts/static'
import { DEFAULT_PUBLIC_KEY } from '@invariant-labs/sdk-eclipse/lib/market'
import { fromFee } from '@invariant-labs/sdk-eclipse/lib/utils'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { SwapToken } from '@store/selectors/solanaWallet'

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
  title: 'PageComponent/Swap',
  component: Swap,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof Swap>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    commonTokens: [
      new PublicKey('So11111111111111111111111111111111111111112'),
      new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
      new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
    ],
    handleAddToken: fn(),
    initialHideUnknownTokensValue: false,
    onSwap: fn(),
    initialSlippage: '0.5',
    initialTokenFromIndex: null,
    initialTokenToIndex: null,
    isBalanceLoading: false,
    isFetchingNewPool: false,
    isWaitingForNewPool: false,
    onConnectWallet: fn(),
    onDisconnectWallet: fn(),
    onHideUnknownTokensChange: fn(),
    onRefresh: fn(),
    onSetPair: fn(),
    onSlippageChange: fn(),
    pools: [],
    progress: 'none',
    swapData: {
      slippage: { v: fromFee(new BN(1000)) },
      estimatedPriceAfterSwap: { v: new BN(0) },
      poolIndex: 0,
      tokenFrom: DEFAULT_PUBLIC_KEY,
      tokenTo: DEFAULT_PUBLIC_KEY,
      amountIn: new BN(0),
      amountOut: new BN(0),
      byAmountIn: false
    },
    tickmap: {},
    tokens: tokens,
    walletStatus: Status.Initialized,
    copyTokenAddressHandler: fn(),
    network: NetworkType.Testnet,
    ethBalance: 2000000000,
    poolTicks: {},
    priceFromLoading: false,
    priceToLoading: false,
    unwrapWETH: fn(),
    wrappedETHAccountExist: true,
    deleteTimeoutError: fn(),
    isTimeoutError: false
  },
  render: args => {
    return <Swap {...args} />
  }
}
