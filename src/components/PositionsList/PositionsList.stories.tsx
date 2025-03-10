import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { PositionsList } from './PositionsList'
import { NetworkType } from '@store/consts/static'
import { IPositionItem } from './PositionItem/PositionItem'

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
    noInitialPositions: false
  }
}
