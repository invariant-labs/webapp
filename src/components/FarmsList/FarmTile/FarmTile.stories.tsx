import React from 'react'
import { storiesOf } from '@storybook/react'
import { FarmTile } from './FarmTile'
import { NetworkType, tokens } from '@consts/static'
storiesOf('farmsList/tile', module)
  .add('active', () => {
    return (
      <FarmTile
        isActive
        apyPercent={1}
        totalStaked={100000}
        liquidity={2137}
        farmId='qwerty'
        tokenX={tokens[NetworkType.DEVNET][0]}
        tokenY={tokens[NetworkType.DEVNET][1]}
      />
    )
  })
  .add('inactive', () => {
    return (
      <FarmTile
        apyPercent={1}
        totalStaked={100000}
        liquidity={2137}
        farmId='qwerty'
        tokenX={tokens[NetworkType.DEVNET][0]}
        tokenY={tokens[NetworkType.DEVNET][1]}
      />
    )
  })
