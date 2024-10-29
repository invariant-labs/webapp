import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import SimpleInput from './SimpleInput'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Inputs/SimpleInput',
  component: SimpleInput,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ],
  args: {
    error: null,
    className: '',
    decimal: 2,
    placeholder: '0.0'
  }
} satisfies Meta<typeof SimpleInput>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: args => {
    const [inputValue, setInputValue] = useState(args.value || '')

    const handleValueChange = (newValue: string) => {
      setInputValue(newValue)
      args.setValue(newValue)
    }

    return <SimpleInput {...args} value={inputValue} setValue={handleValueChange} />
  },
  args: {
    setValue: (value: string) => console.log(value)
  }
}
