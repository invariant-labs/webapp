import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import PoolList from './PoolList'
import { store } from '@store/index'
import { Provider } from 'react-redux'
import { NetworkType } from '@store/consts/static'
import { fn } from '@storybook/test'

const meta = {
  title: 'Stats/PoolList',
  component: PoolList,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof PoolList>

export default meta
type Story = StoryObj<typeof meta>

const poolsList = Array(40)
  .fill({})
  .map(() => {
    const randomVolume = Math.random() * 1000000000
    const randomTVL = Math.random() * 500000000
    const randomFee = +(Math.random() * 500).toFixed(2)
    const randomApy = Math.random() * 5000000000
    const randomVolume24 = Math.random() * 1000
    const randomTvl24 = Math.random() * 100000
    const randomApyDataFees = Math.random() * 100
    const randomAccumulatedFarmsAvg = Math.random() * 1000
    const randomAccumulatedFarmsSingleTick = Math.random() * 2000

    return {
      symbolFrom: 'BCT',
      symbolTo: 'USDT',
      iconFrom:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      iconTo:
        'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg',
      volume: randomVolume,
      TVL: randomTVL,
      fee: randomFee,
      apy: randomApy,
      apyData: {
        fees: randomApyDataFees,
        accumulatedFarmsAvg: randomAccumulatedFarmsAvg,
        accumulatedFarmsSingleTick: randomAccumulatedFarmsSingleTick
      },
      tokenXDetails: {
        address: '5Dvb5E8zKU4E9c7YxfNL5VC8YQj4VAFUTCGYY9ayFLnnY3UA',
        chainId: 101,
        decimals: 6,
        name: 'UST (Portal)',
        symbol: 'UST',
        logoURI:
          'https://raw.githubusercontent.com/wormhole-foundation/wormhole-token-list/main/assets/UST_wh.png',
        tags: ['wormhole', 'old-registry'],
        extensions: { coingeckoId: 'terrausd-wormhole' },
        coingeckoId: 'terrausd-wormhole'
      },
      tokenYDetails: {
        address: '5Dvb5E8zKU4E9c7YxfNL5VC8YQj4VAFUTCGYY9ayFLnnY3UA',
        chainId: 101,
        decimals: 6,
        name: 'USD Coin',
        symbol: 'USDC',
        logoURI:
          'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
        tags: ['old-registry', 'solana-fm'],
        extensions: { coingeckoId: 'usd-coin' },
        coingeckoId: 'usd-coin'
      },
      volume24: randomVolume24,
      tvl: randomTvl24,
      addressFrom: '5Dvb5E8zKU4E9c7YxfNL5VC8YQj4VAFUTCGYY9ayFLnnY3UA',
      addressTo: '5Dvb5E8zKU4E9c7YxfNL5VC8YQj4VAFUTCGYY9ayFLnnY3UA',
      isUnknownFrom: true,
      isUnknownTo: true,
      poolAddress: ''
    }
  })

export const Primary: Story = {
  args: {
    data: poolsList,
    network: NetworkType.Local,
    copyAddressHandler: fn()
  }
}
