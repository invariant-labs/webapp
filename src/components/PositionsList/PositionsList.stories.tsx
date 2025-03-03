import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { PositionsList } from './PositionsList'
import { NetworkType } from '@store/consts/static'
import { Keypair } from '@solana/web3.js'
import { BN } from '@coral-xyz/anchor'
import { IPositionItem } from './types'
import { fn } from '@storybook/test'

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
    liquidity: 453.5,
    poolAddress: Keypair.generate().publicKey,
    poolData: {
      address: Keypair.generate().publicKey,
      bump: 0,
      currentTickIndex: 0,
      fee: new BN(0),
      feeGrowthGlobalX: new BN(0),
      feeProtocolTokenX: new BN(0),
      feeProtocolTokenY: new BN(0),
      feeReceiver: Keypair.generate().publicKey,
      lastTimestamp: new BN(0),
      oracleAddress: Keypair.generate().publicKey,
      oracleInitialized: true,
      liquidity: new BN(0),
      poolIndex: 0,
      positionIterator: new BN(0),
      protocolFee: new BN(0),
      secondsPerLiquidityGlobal: new BN(0),
      sqrtPrice: new BN(0),
      startTimestamp: new BN(0),
      tickmap: Keypair.generate().publicKey,
      tickSpacing: 0,
      tokenX: Keypair.generate().publicKey,
      tokenY: Keypair.generate().publicKey,
      tokenXReserve: Keypair.generate().publicKey,
      tokenYReserve: Keypair.generate().publicKey,
      feeGrowthGlobalY: new BN(0)
    },
    fee: 0.05,
    tokenXLiq: 5000,
    tokenYLiq: 300.2,
    valueX: 10000.45,
    valueY: 21370.4,
    id: '1',
    isLocked: false
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
    id: '2',
    isLocked: false,
    liquidity: new BN(0),
    poolAddress: Keypair.generate().publicKey,
    poolData: {
      address: Keypair.generate().publicKey,
      bump: 0,
      currentTickIndex: 0,
      fee: new BN(0),
      feeGrowthGlobalX: new BN(0),
      feeProtocolTokenX: new BN(0),
      feeProtocolTokenY: new BN(0),
      feeReceiver: Keypair.generate().publicKey,
      lastTimestamp: new BN(0),
      oracleAddress: Keypair.generate().publicKey,
      oracleInitialized: true,
      liquidity: new BN(0),
      poolIndex: 0,
      positionIterator: new BN(0),
      protocolFee: new BN(0),
      secondsPerLiquidityGlobal: new BN(0),
      sqrtPrice: new BN(0),
      startTimestamp: new BN(0),
      tickmap: Keypair.generate().publicKey,
      tickSpacing: 0,
      tokenX: Keypair.generate().publicKey,
      tokenY: Keypair.generate().publicKey,
      tokenXReserve: Keypair.generate().publicKey,
      tokenYReserve: Keypair.generate().publicKey,
      feeGrowthGlobalY: new BN(0)
    }
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
    id: '3',
    isLocked: false,
    liquidity: new BN(0),
    poolAddress: Keypair.generate().publicKey,
    poolData: {
      address: Keypair.generate().publicKey,
      bump: 0,
      currentTickIndex: 0,
      fee: new BN(0),
      feeGrowthGlobalX: new BN(0),
      feeProtocolTokenX: new BN(0),
      feeProtocolTokenY: new BN(0),
      feeReceiver: Keypair.generate().publicKey,
      lastTimestamp: new BN(0),
      oracleAddress: Keypair.generate().publicKey,
      oracleInitialized: true,
      liquidity: new BN(0),
      poolIndex: 0,
      positionIterator: new BN(0),
      protocolFee: new BN(0),
      secondsPerLiquidityGlobal: new BN(0),
      sqrtPrice: new BN(0),
      startTimestamp: new BN(0),
      tickmap: Keypair.generate().publicKey,
      tickSpacing: 0,
      tokenX: Keypair.generate().publicKey,
      tokenY: Keypair.generate().publicKey,
      tokenXReserve: Keypair.generate().publicKey,
      tokenYReserve: Keypair.generate().publicKey,
      feeGrowthGlobalY: new BN(0)
    }
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
    id: '4',
    isLocked: false,
    liquidity: new BN(0),
    poolAddress: Keypair.generate().publicKey,
    poolData: {
      address: Keypair.generate().publicKey,
      bump: 0,
      currentTickIndex: 0,
      fee: new BN(0),
      feeGrowthGlobalX: new BN(0),
      feeProtocolTokenX: new BN(0),
      feeProtocolTokenY: new BN(0),
      feeReceiver: Keypair.generate().publicKey,
      lastTimestamp: new BN(0),
      oracleAddress: Keypair.generate().publicKey,
      oracleInitialized: true,
      liquidity: new BN(0),
      poolIndex: 0,
      positionIterator: new BN(0),
      protocolFee: new BN(0),
      secondsPerLiquidityGlobal: new BN(0),
      sqrtPrice: new BN(0),
      startTimestamp: new BN(0),
      tickmap: Keypair.generate().publicKey,
      tickSpacing: 0,
      tokenX: Keypair.generate().publicKey,
      tokenY: Keypair.generate().publicKey,
      tokenXReserve: Keypair.generate().publicKey,
      tokenYReserve: Keypair.generate().publicKey,
      feeGrowthGlobalY: new BN(0)
    }
  }
]

const handleClick = () => {
  console.log('actionButton add Position')
}

export const Primary: Story = {
  args: {
    data,
    lockedData: data,
    onAddPositionClick: handleClick,
    itemsPerPage: 5,
    noConnectedBlockerProps: {
      onConnect: () => {}
    },
    currentNetwork: NetworkType.Mainnet,
    handleRefresh: () => {},
    initialPage: 1,
    setLastPage: () => {},
    length: 0,
    lockedLength: 0,
    noInitialPositions: false,
    handleClaimFee: fn(),
    handleClosePosition: fn(),
    handleLockPosition: fn()
  }
}
