import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import AnimatedNumber from './AnimatedNumber'
import { formatNumberWithSuffix } from '@utils/utils'
import { Button, TextField } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import { MemoryRouter } from 'react-router-dom'

const meta = {
  title: 'Common/AnimatedNumber',
  component: AnimatedNumber,
  args: {
    start: 0,
    finish: 100,
    format: (e: number) => formatNumberWithSuffix(e)
  },
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    )
  ]
} satisfies Meta<typeof AnimatedNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: args => {
    const [start, setStart] = useState(0)
    const [finish, setFinish] = useState(100)
    const [inputValue, setInputValue] = useState('')

    const handleSetClick = () => {
      const newFinish = parseFloat(inputValue)
      if (!isNaN(newFinish)) {
        setStart(finish)
        setFinish(newFinish)
        setInputValue('')
      }
    }

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
        <div
          style={{
            width: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
          <AnimatedNumber {...args} start={start} finish={finish} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TextField
            label='New Finish Value'
            variant='outlined'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            type='number'
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleSetClick}
            style={{ marginLeft: '10px' }}>
            Set
          </Button>
        </div>
      </div>
    )
  },
  args: {
    format: (n: number) => formatNumberWithSuffix(n)
  }
}
