import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'
import RangeSelector from './RangeSelector'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Components/RangeSelector',
  component: RangeSelector,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <div style={{ width: '500px' }}>
            <Story />
          </div>
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof RangeSelector>

export default meta
type Story = StoryObj<typeof meta>

const PrimaryComponent: React.FC<typeof Primary.args> = args => {
  const [concentrationIndex, setConcentrationIndex] = useState<number>(2)

  return (
    <RangeSelector
      {...args}
      concentrationIndex={concentrationIndex}
      setConcentrationIndex={setConcentrationIndex}
      tickSpacing={1}
      xDecimal={9}
      yDecimal={12}
      midPrice={{ x: 1, index: 1 }}
      data={[{ x: 0, y: 0, index: 0 }]}
    />
  )
}

export const Primary: Story = {
  args: {
    currentPairReversed: false,
    isXtoY: true,
    midPrice: { x: 1, index: 1 },
    concentrationArray: [0.1, 0.2, 0.3, 0.4, 0.5],
    concentrationIndex: 2,
    data: [{ x: 0, y: 0, index: 0 }],
    getTicksInsideRange: () => ({ leftInRange: 0, rightInRange: 100 }),
    minimumSliderIndex: 0,
    onChangeRange: fn(),
    poolIndex: 0,
    reloadHandler: fn(),
    setConcentrationIndex: fn(),
    ticksLoading: false,
    tickSpacing: 1,
    tokenASymbol: 'SOL',
    tokenBSymbol: 'ETH',
    xDecimal: 9,
    yDecimal: 12,
    setShouldReversePlot: fn(),
    shouldReversePlot: false,
    shouldNotUpdatePriceRange: false,
    unblockUpdatePriceRange: fn(),
    onlyUserPositions: false,
    setOnlyUserPositions: fn()
  },
  render: args => <PrimaryComponent {...args} />
}
