import { NetworkType } from '@store/consts/static'
import { PositionItem } from './PositionItem'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/PositionItem',
  component: PositionItem
} satisfies Meta<typeof PositionItem>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    tokenXName: 'BTC',
    tokenYName: 'AZERO',
    tokenXIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    tokenYIcon:
      'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    min: 2149.6,
    max: 149.6,
    fee: 0.05,
    valueX: 10000.45,
    valueY: 2137.4,
    id: '0',
    address: '',
    tokenXLiq: 5000,
    tokenYLiq: 300.2,
    currentPrice: 10000,
    network: NetworkType.Testnet,
    isFullRange: false
  }
}
