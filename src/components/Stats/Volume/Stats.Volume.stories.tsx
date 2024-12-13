import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import Volume from './Volume'
import { store } from '@store/index'
import { Provider } from 'react-redux'

const meta = {
  title: 'Stats/Volume',
  component: Volume,
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
} satisfies Meta<typeof Volume>

export default meta
type Story = StoryObj<typeof meta>

const volume24h = { value: 4022333.4231874547, change: -52.23919554927298 }

const volumePlotData = [
  { timestamp: 1716552000000, value: 4512625.608953071 },
  { timestamp: 1716638400000, value: 2696192.124473429 },
  { timestamp: 1716724800000, value: 1659467.054644387 },
  { timestamp: 1716811200000, value: 2478284.0069509996 },
  { timestamp: 1716897600000, value: 4066913.005100426 },
  { timestamp: 1717070400000, value: 8535283.141011314 },
  { timestamp: 1717156800000, value: 3057580.304299723 },
  { timestamp: 1717243200000, value: 3438682.6270488105 },
  { timestamp: 1717329600000, value: 2405098.563568 },
  { timestamp: 1717416000000, value: 3010963.8025822206 },
  { timestamp: 1717502400000, value: 3361458.9228925616 },
  { timestamp: 1717588800000, value: 4530301.107894169 },
  { timestamp: 1717675200000, value: 4650692.700283449 },
  { timestamp: 1717761600000, value: 6302225.768652554 },
  { timestamp: 1717848000000, value: 7763069.118376541 },
  { timestamp: 1717934400000, value: 3534570.8735763766 },
  { timestamp: 1718020800000, value: 3844000.33935 },
  { timestamp: 1718107200000, value: 4168392.436431511 },
  { timestamp: 1718193600000, value: 4212258.790136831 },
  { timestamp: 1718280000000, value: 4115531.3857006463 },
  { timestamp: 1718366400000, value: 2844247.1688079913 },
  { timestamp: 1718452800000, value: 3571590.550698615 },
  { timestamp: 1718539200000, value: 1919774.698571 },
  { timestamp: 1718625600000, value: 3474827.407744309 },
  { timestamp: 1718712000000, value: 6270210.212383572 },
  { timestamp: 1718798400000, value: 8944805.2201305 },
  { timestamp: 1718884800000, value: 8421829.300084637 },
  { timestamp: 1718971200000, value: 4022333.4231874547 }
]
export const Primary: Story = {
  args: {
    volume: volume24h.value,
    percentVolume: volume24h.change,
    data: volumePlotData,
    isLoading: false
  }
}
