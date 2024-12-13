import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import VolumeBar from './VolumeBar'
import { store } from '@store/index'
import { Provider } from 'react-redux'

const meta = {
  title: 'Stats/VolumeBar',
  component: VolumeBar,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <div style={{ width: '1000px' }}>
            <Story />
          </div>
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof VolumeBar>

export default meta
type Story = StoryObj<typeof meta>

const volume24h = { value: 4022333.4231874547, change: -52.239195549272985 }

const tvl24h = { value: 279204.3080979749, change: -3.604507854550285 }

const fees24h = { value: 599.544959417, change: 47.79969743772543 }

export const Primary: Story = {
  args: {
    volume: volume24h.value,
    percentVolume: volume24h.change,
    tvlVolume: tvl24h.value,
    percentTvl: tvl24h.change,
    feesVolume: fees24h.value,
    percentFees: fees24h.change,
    isLoading: false
  }
}
