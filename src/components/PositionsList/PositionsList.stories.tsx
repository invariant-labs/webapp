import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { PositionsList } from './PositionsList'
import { NetworkType } from '@store/consts/static'
import { Keypair } from '@solana/web3.js'
import { IPositionItem } from './types'
import { fn } from '@storybook/test'
import { BN } from '@project-serum/anchor'

const meta = {
  title: 'Components/PositionsList',
  component: PositionsList,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
} satisfies Meta<typeof PositionsList>

export default meta
type Story = StoryObj<typeof meta>

const data: IPositionItem[] = [
  {
    address: 'So11111111111111111111111111111111111111112',
    currentPrice: 123.234,
    isFullRange: false,
    network: NetworkType.Testnet,
    tokenXName: 'BTC',
    tokenYName: 'SNY',
    position: {
      bump: 0,
      feeGrowthInsideX: new BN(0),
      feeGrowthInsideY: new BN(0),
      id: 0,
      lastSlot: new BN(0),
      lowerTickIndex: new BN(0),
      owner: Keypair.generate().publicKey,
      pool: Keypair.generate().publicKey,
      secondsPerLiquidityInside: new BN(0),
      tokensOwedX: new BN(0),
      tokensOwedY: new BN(0),
      upperTickIndex: new BN(0),
      liquidity: new BN(0)
    },
    tokenXIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    tokenYIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    min: 2149.6,
    max: 149.6,
    fee: 0.05,
    tokenXLiq: 5000,
    tokenYLiq: 300.2,
    valueX: 10000.45,
    valueY: 21370.4,
    id: '1'
  },
  {
    address: 'So11111111111111111111111111111111111111112',
    currentPrice: 123.234,
    isFullRange: false,
    network: NetworkType.Testnet,
    tokenXName: 'BTC',
    tokenYName: 'SNY',
    position: {
      bump: 0,
      feeGrowthInsideX: new BN(0),
      feeGrowthInsideY: new BN(0),
      id: 0,
      lastSlot: new BN(0),
      lowerTickIndex: new BN(0),
      owner: Keypair.generate().publicKey,
      pool: Keypair.generate().publicKey,
      secondsPerLiquidityInside: new BN(0),
      tokensOwedX: new BN(0),
      tokensOwedY: new BN(0),
      upperTickIndex: new BN(0),
      liquidity: new BN(0)
    },
    tokenXIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    tokenYIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    min: 2149.6,
    max: 149.6,
    fee: 0.05,
    tokenXLiq: 5000,
    tokenYLiq: 300.2,
    valueX: 10000.45,
    valueY: 21370.4,
    id: '2'
  },
  {
    address: 'So11111111111111111111111111111111111111112',
    currentPrice: 123.234,
    isFullRange: false,
    network: NetworkType.Testnet,
    tokenXName: 'BTC',
    tokenYName: 'SNY',
    position: {
      bump: 0,
      feeGrowthInsideX: new BN(0),
      feeGrowthInsideY: new BN(0),
      id: 0,
      lastSlot: new BN(0),
      lowerTickIndex: new BN(0),
      owner: Keypair.generate().publicKey,
      pool: Keypair.generate().publicKey,
      secondsPerLiquidityInside: new BN(0),
      tokensOwedX: new BN(0),
      tokensOwedY: new BN(0),
      upperTickIndex: new BN(0),
      liquidity: new BN(0)
    },
    tokenXIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    tokenYIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    min: 2149.6,
    max: 149.6,
    fee: 0.05,
    tokenXLiq: 5000,
    tokenYLiq: 300.2,
    valueX: 10000.45,
    valueY: 21370.4,
    id: '3'
  },
  {
    address: 'So11111111111111111111111111111111111111112',
    currentPrice: 123.234,
    isFullRange: false,
    network: NetworkType.Testnet,
    tokenXName: 'BTC',
    tokenYName: 'SNY',
    position: {
      bump: 0,
      feeGrowthInsideX: new BN(0),
      feeGrowthInsideY: new BN(0),
      id: 0,
      lastSlot: new BN(0),
      lowerTickIndex: new BN(0),
      owner: Keypair.generate().publicKey,
      pool: Keypair.generate().publicKey,
      secondsPerLiquidityInside: new BN(0),
      tokensOwedX: new BN(0),
      tokensOwedY: new BN(0),
      upperTickIndex: new BN(0),
      liquidity: new BN(0)
    },
    tokenXIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    tokenYIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    min: 2149.6,
    max: 149.6,
    fee: 0.05,
    tokenXLiq: 5000,
    tokenYLiq: 300.2,
    valueX: 10000.45,
    valueY: 21370.4,
    id: '4'
  }
]

const handleClick = () => {
  console.log('actionButton add Position')
}

export const Primary: Story = {
  args: {
    data,
    currentNetwork: NetworkType.Mainnet,

    onAddPositionClick: handleClick,
    itemsPerPage: 5,
    noConnectedBlockerProps: {
      onConnect: () => {}
    },
    handleRefresh: () => {},
    initialPage: 1,
    setLastPage: () => {},
    length: 0,
    noInitialPositions: false,
    handleClaimFee: fn(),
    handleClosePosition: fn()
  }
}
