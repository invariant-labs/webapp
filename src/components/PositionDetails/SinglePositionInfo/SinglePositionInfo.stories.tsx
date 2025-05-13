import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { MemoryRouter } from 'react-router-dom'
import SinglePositionInfo from './SinglePositionInfo'
import { PublicKey } from '@solana/web3.js'

const meta = {
  title: 'Components/SinglePositionInfo',
  component: SinglePositionInfo,
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof SinglePositionInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onClickClaimFee: fn(),
    tokenX: {
      name: 'BTC',
      icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
      decimal: 9,
      liqValue: 10000.23532,
      claimValue: 21.37,
      balance: 9.11
    },
    tokenY: {
      name: 'ETH',
      icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
      decimal: 12,
      liqValue: 10000.23532,
      claimValue: 21.37,
      balance: 9.11
    },
    xToY: true,
    showFeesLoader: false,
    poolDetails: {
      tvl: 0,
      volume24: 0,
      fee24: 0,
      apy: 0,
      fee: 0.01
    },
    poolAddress: new PublicKey('0123456789'),
    isPreview: false,
    isClosing: false
  },
  render: args => {
    return (
      <SinglePositionInfo
        {...args}
        tokenX={{
          name: 'BTC',
          icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
          decimal: 9,
          liqValue: 10000.23532,
          claimValue: 21.37,
          balance: 9.11
        }}
        tokenY={{
          name: 'ETH',
          icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png',
          decimal: 12,
          liqValue: 10000.23532,
          claimValue: 21.37,
          balance: 9.11
        }}
        xToY={true}
        onClickClaimFee={fn()}
      />
    )
  }
}
