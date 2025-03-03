import { NetworkType } from '@store/consts/static'

import type { Meta, StoryObj } from '@storybook/react'
import { Keypair } from '@solana/web3.js'
import { PositionItemMobile } from './variants/PositionMobileCard/PositionItemMobile'
import { fn } from '@storybook/test'
import { BN } from '@project-serum/anchor'

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

    id: '0',
    address: '',
    tokenXLiq: 5000,
    tokenYLiq: 300.2,
    currentPrice: 10000,
    network: NetworkType.Testnet,
    isFullRange: false,
    handleClaimFee: fn(),
    handleClosePosition: fn()
  }
}
