import React from 'react'
import { storiesOf } from '@storybook/react'
import { FarmTile } from './FarmTile'
import { NetworkType, tokens } from '@consts/static'
import { MemoryRouter } from 'react-router-dom'
storiesOf('farmsList/tile', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('active', () => {
    return (
      <div style={{ width: 500, height: 500 }}>
        <FarmTile
          isActive
          apyPercent={1}
          totalStaked={100000}
          liquidity={2137}
          farmId='qwerty'
          tokenX={tokens[NetworkType.DEVNET][0]}
          tokenY={tokens[NetworkType.DEVNET][1]}
        />
      </div>
    )
  })
  .add('inactive', () => {
    return (
      <div style={{ width: 500, height: 500 }}>
        <FarmTile
          apyPercent={1}
          totalStaked={100000}
          liquidity={2137}
          farmId='qwerty'
          tokenX={tokens[NetworkType.DEVNET][0]}
          tokenY={tokens[NetworkType.DEVNET][1]}
        />
      </div>
    )
  })
