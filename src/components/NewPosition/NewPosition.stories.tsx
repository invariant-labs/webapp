import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { MemoryRouter } from 'react-router-dom'
import NewPosition from './NewPosition'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { SwapToken } from '@store/selectors/solanaWallet'
import { NetworkType } from '@store/consts/static'
import { Status } from '@store/reducers/solanaWallet'

const meta = {
  title: 'PageComponent/NewPosition',
  component: NewPosition,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof NewPosition>

export default meta
type Story = StoryObj<typeof meta>

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

export const Primary: Story = {
  args: {
    currentPairReversed: false,
    isXtoY: true,
    addLiquidityHandler: fn(),
    midPrice: { x: 1234, index: 23, sqrtPrice: new BN(1111111111123) },
    commonTokens: [],
    copyPoolAddressHandler: fn(),
    currentFeeIndex: 0,
    currentPriceSqrt: 123,
    data: [],
    feeTiers: [
      { feeValue: 0.1 },
      { feeValue: 0.2 },
      { feeValue: 0.3 },
      { feeValue: 0.4 },
      { feeValue: 0.5 }
    ],
    handleAddToken: fn(),
    initialFee: '0.05',
    initialHideUnknownTokensValue: false,
    initialOpeningPositionMethod: 'concentration',
    initialSlippage: '0.01',
    initialTokenFrom: 'BTC',
    initialTokenTo: 'ETH',
    isCurrentPoolExisting: true,
    isWaitingForNewPool: false,
    onChangePositionTokens: fn(),
    onHideUnknownTokensChange: fn(),
    onPositionOpeningMethodChange: fn(),
    onSlippageChange: fn(),
    poolIndex: 0,
    progress: 'progress',
    reloadHandler: fn(),
    setMidPrice: fn(),
    ticksLoading: false,
    tickSpacing: 1,
    tokens: tokens,
    xDecimal: 9,
    yDecimal: 12,
    hasTicksError: false,
    calcAmount: fn(),
    loadingTicksAndTickMaps: false,
    onRefresh: fn(),
    isBalanceLoading: false,
    shouldNotUpdatePriceRange: false,
    unblockUpdatePriceRange: fn(),
    isGetLiquidityError: false,
    onlyUserPositions: false,
    setOnlyUserPositions: fn(),
    network: NetworkType.Testnet,
    isLoadingTokens: false,
    solBalance: 200000000,
    walletStatus: Status.Initialized,
    onConnectWallet: () => {},
    onDisconnectWallet: () => {},
    poolAddress: '',
    calculatePoolAddress: fn(),
    globalPrice: 1000000,
    noConnectedBlockerProps: {
      onConnect: fn()
    },
    canNavigate: true,
    initialConcentration: '30',
    feeTiersWithTvl: [],
    isLoadingStats: false,
    totalTvl: 0
  },
  render: () => {
    return (
      <NewPosition
        midPrice={{ x: 1234, index: 23, sqrtPrice: 123 }}
        currentPriceSqrt={123}
        tickSpacing={1}
        xDecimal={9}
        yDecimal={12}
        commonTokens={[]}
        handleAddToken={fn()}
        onChangePositionTokens={fn()}
        onPositionOpeningMethodChange={fn()}
        onSlippageChange={fn()}
        onHideUnknownTokensChange={fn()}
        copyPoolAddressHandler={fn()}
        reloadHandler={fn()}
        setMidPrice={fn()}
        ticksLoading={false}
        hasTicksError={false}
        progress='progress'
        isCurrentPoolExisting={true}
        isWaitingForNewPool={false}
        poolIndex={0}
        tokens={tokens}
        currentPairReversed={false}
        isXtoY={true}
        initialTokenFrom='BTC'
        initialTokenTo='ETH'
        initialFee='0.05'
        initialSlippage='0.01'
        initialOpeningPositionMethod='concentration'
        initialHideUnknownTokensValue={false}
        data={[]}
        currentFeeIndex={0}
        feeTiers={[
          { feeValue: 0.1 },
          { feeValue: 0.2 },
          { feeValue: 0.3 },
          { feeValue: 0.4 },
          { feeValue: 0.5 }
        ]}
        addLiquidityHandler={fn()}
        calcAmount={() => 1n}
        loadingTicksAndTickMaps={false}
        onRefresh={fn()}
        isBalanceLoading={false}
        shouldNotUpdatePriceRange={false}
        unblockUpdatePriceRange={fn()}
        isGetLiquidityError={false}
        onlyUserPositions={false}
        setOnlyUserPositions={fn()}
        network={NetworkType.Testnet}
        isLoadingTokens={false}
        solBalance={2000000000}
        walletStatus={Status.Initialized}
        onConnectWallet={() => {}}
        onDisconnectWallet={() => {}}
        poolAddress={''}
        calculatePoolAddress={fn()}
        globalPrice={1000000}
        noConnectedBlockerProps={{
          onConnect: fn()
        }}
        canNavigate={true}
        initialConcentration='30'
        feeTiersWithTvl={{}}
        totalTvl={0}
        isLoadingStats={false}
      />
    )
  }
}
