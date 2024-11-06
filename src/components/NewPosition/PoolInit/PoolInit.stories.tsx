import type { Meta, StoryObj } from '@storybook/react'
import PoolInit from './PoolInit'
import { fn } from '@storybook/test'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { store } from '@store/index'

const meta = {
  title: 'Components/PoolInit',
  component: PoolInit,
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
} satisfies Meta<typeof PoolInit>

export default meta
type Story = StoryObj<typeof meta>

const PrimaryComponent: React.FC<typeof Primary.args> = args => {
  const [midPrice, setMidPrice] = useState(0)

  return (
    <PoolInit
      {...args}
      concentrationArray={[0.1, 0.2, 0.3, 0.4, 0.5]}
      concentrationIndex={2}
      minimumSliderIndex={0}
      setConcentrationIndex={fn()}
      xDecimal={6}
      yDecimal={6}
      tickSpacing={1}
      isXtoY={true}
      midPriceIndex={midPrice}
      onChangeMidPrice={setMidPrice}
      currentPairReversed={null}
      onChangeRange={fn()}
      tokenASymbol='BTC'
      tokenBSymbol='ETH'
    />
  )
}

export const Primary: Story = {
  args: {
    currentPairReversed: false,
    isXtoY: true,
    midPriceIndex: 0,
    onChangeMidPrice: fn(),
    onChangeRange: fn(),
    tickSpacing: 1,
    tokenASymbol: 'BTC',
    tokenBSymbol: 'ETH',
    xDecimal: 9,
    yDecimal: 12,
    concentrationArray: [0.1, 0.2, 0.3, 0.4, 0.5],
    concentrationIndex: 2,
    minimumSliderIndex: 0,
    setConcentrationIndex: fn(),
    positionOpeningMethod: 'range'
  },
  render: args => <PrimaryComponent {...args} />
}
