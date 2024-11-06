import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import RangeInput, { IRangeInput } from './RangeInput'
import { useState } from 'react'

const meta = {
  title: 'Inputs/RangeInput',
  component: RangeInput,
  args: {}
} satisfies Meta<typeof RangeInput>

export default meta
type Story = StoryObj<typeof meta>

const RangeInputWrapper: React.FC<IRangeInput> = args => {
  const [val, setVal] = useState('100')

  return (
    <div
      style={{
        backgroundColor: '#202946',
        width: 400,
        paddingBlock: 20
      }}>
      <RangeInput
        {...args}
        style={{ flex: '1 1 0%', gap: 12, width: '300px', margin: 'auto' }}
        currentValue={val}
        decreaseValue={() => {
          setVal((+val - 0.01).toFixed(2).toString())
        }}
        increaseValue={() => {
          setVal((+val + 0.01).toFixed(2).toString())
        }}
        setValue={value => {
          setVal(value)
        }}
        onBlur={() => {
          setVal((+val).toFixed(2).toString())
        }}
      />
    </div>
  )
}

export const Primary: Story = {
  args: {
    currentValue: '10',
    decreaseValue: fn(),
    diffLabel: 'Max/Current price difference:',
    increaseValue: fn(),
    label: 'Min price',
    onBlur: fn(),
    percentDiff: 100,
    setValue: fn(),
    tokenFromSymbol: 'USDC',
    tokenToSymbol: 'USDT'
  },
  render: args => <RangeInputWrapper {...args} />
}
