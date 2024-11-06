import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ConcentrationTypeSwitch from './ConcentrationTypeSwitch'
import { fn } from '@storybook/test'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Components/ConcentrationTypeSwitch',
  component: ConcentrationTypeSwitch,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof ConcentrationTypeSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: args => {
    const [currentValue, setCurrentValue] = useState<number>(args.currentValue)

    const handleSwitch = (isConcentrated: boolean) => {
      setCurrentValue(isConcentrated ? 0 : 1)
      args.onSwitch(isConcentrated)
    }

    return <ConcentrationTypeSwitch {...args} currentValue={currentValue} onSwitch={handleSwitch} />
  },
  args: {
    currentValue: 0,
    onSwitch: fn()
  }
}
