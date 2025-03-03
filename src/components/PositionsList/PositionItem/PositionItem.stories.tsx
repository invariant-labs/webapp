import { NetworkType } from '@store/consts/static'

import type { Meta, StoryObj } from '@storybook/react'
import { Keypair } from '@solana/web3.js'
import { BN } from '@coral-xyz/anchor'
import { PositionItemMobile } from './variants/PositionMobileCard/PositionItemMobile'
import { fn } from '@storybook/test'

const meta = {
  title: 'Components/PositionItem',
  component: PositionItemMobile
} satisfies Meta<typeof PositionItemMobile>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    tokenXName: 'BTC',
    tokenYName: 'AZERO',
    setAllowPropagation: () => {},
    isActive: false,
    tokenXIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    tokenYIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    min: 2149.6,
    max: 149.6,
    fee: 0.05,
    valueX: 10000.45,
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
    valueY: 2137.4,
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
    },

    id: '0',
    address: '',
    tokenXLiq: 5000,
    tokenYLiq: 300.2,
    currentPrice: 10000,
    network: NetworkType.Testnet,
    isFullRange: false,
    isLocked: false,
    handleClaimFee: fn(),
    handleClosePosition: fn(),
    handleLockPosition: fn()
  }
}
