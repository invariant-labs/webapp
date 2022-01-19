import React from 'react'
import { storiesOf } from '@storybook/react'
import { SelectedFarm } from './SelectedFarm'
import { NetworkType, tokens } from '@consts/static'
import { MemoryRouter } from 'react-router-dom'
storiesOf('farmsList/selectedFarm', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('stake', () => {
    return (
      <div style={{ width: 500, height: 500 }}>
        <SelectedFarm />
      </div>
    )
  })
  .add('unstake', () => {
    return (
      <div style={{ width: 500, height: 500 }}>
        <SelectedFarm />
      </div>
    )
  })
