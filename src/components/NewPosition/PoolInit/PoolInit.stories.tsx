import React from 'react'
import { storiesOf } from '@storybook/react'
import PoolInit from './PoolInit'
import { action } from '@storybook/addon-actions'

storiesOf('position/poolInit', module)
  .add('setter', () => (
    <PoolInit
      tokenASymbol='BAT'
      tokenBSymbol='ETH'
      onChangeRange={(left, right) => {
        action(`range indexes: ${left} - ${right}`)()
      }}
      xDecimal={6}
      yDecimal={6}
      tickSpacing={1}
      isXtoY={true}
    />
  ))
