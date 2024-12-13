import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import Liquidity from './Liquidity'
import { store } from '@store/index'
import { Provider } from 'react-redux'

const meta = {
  title: 'Stats/Liquidity',
  component: Liquidity,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof Liquidity>

export default meta
type Story = StoryObj<typeof meta>

const liquidityPlotData = [
  { timestamp: 1716552000000, value: 283814.9853831609 },
  { timestamp: 1716638400000, value: 296563.856253402 },
  { timestamp: 1716724800000, value: 279605.94078915595 },
  { timestamp: 1716811200000, value: 286414.33889901394 },
  { timestamp: 1716897600000, value: 289328.01251464605 },
  { timestamp: 1717070400000, value: 291109.37093950785 },
  { timestamp: 1717156800000, value: 299144.8861490599 },
  { timestamp: 1717243200000, value: 286275.867182114 },
  { timestamp: 1717329600000, value: 269892.904872398 },
  { timestamp: 1717416000000, value: 267545.83903459297 },
  { timestamp: 1717502400000, value: 263298.0398656629 },
  { timestamp: 1717588800000, value: 267228.09554199304 },
  { timestamp: 1717675200000, value: 264501.37196904595 },
  { timestamp: 1717761600000, value: 265863.77726675477 },
  { timestamp: 1717848000000, value: 402046.74954411597 },
  { timestamp: 1717934400000, value: 414647.28326416895 },
  { timestamp: 1718020800000, value: 412864.8249698 },
  { timestamp: 1718107200000, value: 425187.23476959986 },
  { timestamp: 1718193600000, value: 427589.885517467 },
  { timestamp: 1718280000000, value: 433799.8806224759 },
  { timestamp: 1718366400000, value: 463301.1012211619 },
  { timestamp: 1718452800000, value: 469062.1202646391 },
  { timestamp: 1718539200000, value: 460250.9162467961 },
  { timestamp: 1718625600000, value: 449104.74350912473 },
  { timestamp: 1718712000000, value: 427811.60435006284 },
  { timestamp: 1718798400000, value: 287254.4826316768 },
  { timestamp: 1718884800000, value: 289644.56935049174 },
  { timestamp: 1718971200000, value: 279204.3080979749 }
]
export const Primary: Story = {
  args: {
    data: liquidityPlotData,
    liquidityPercent: 12,
    liquidityVolume: 123,
    isLoading: false
  }
}
