import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { MemoryRouter } from 'react-router-dom'
import PositionDetails from './PositionDetails'
import { NetworkType } from '@store/consts/static'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

const defaultArgs = {
  currentPrice: new BN(10000),
  leftRange: { index: new BN(2), x: new BN(23) },
  rightRange: { index: new BN(2), x: new BN(45354) },
  max: 100,
  min: 0,
  midPrice: { index: new BN(3), x: new BN(4535) },
  reloadHandler: fn(),
  ticksLoading: false,
  tickSpacing: new BN(1),
  closePosition: fn(),
  tokenX: {
    name: 'BTC',
    balance: new BN(10000),
    claimValue: new BN(10000),
    decimal: new BN(9),
    icon: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    liqValue: new BN(10000),
    usdValue: new BN(123)
  },
  tokenY: {
    name: 'ETH',
    balance: new BN(432),
    claimValue: new BN(21),
    decimal: new BN(9),
    icon: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    liqValue: new BN(321),
    usdValue: new BN(3246)
  },
  hasTicksError: false,
  copyPoolAddressHandler: fn(),
  detailsData: [
    { x: new BN(12), y: new BN(1234), index: new BN(1) },
    { x: new BN(123), y: new BN(432), index: new BN(2) }
  ],
  fee: new BN(1),
  onClickClaimFee: fn(),
  onRefresh: fn(),
  isBalanceLoading: false,
  network: NetworkType.Testnet,
  tokenXAddress: new PublicKey('32'),
  tokenYAddress: new PublicKey('22'),
  poolAddress: new PublicKey('32')
}

const meta = {
  title: 'Components/PositionDetails',
  component: PositionDetails,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof PositionDetails>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: defaultArgs,
  render: args => <PositionDetails {...args} />
}
