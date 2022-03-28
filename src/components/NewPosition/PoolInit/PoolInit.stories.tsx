import React from 'react'
import { storiesOf } from '@storybook/react'
import PoolInit from './PoolInit'
import { action } from '@storybook/addon-actions'
import { useState } from '@storybook/addons'

storiesOf('position/poolInit', module).add('setter', () => {
  const [midPrice, setMidPrice] = useState(0)
  return (
    <div style={{ width: 500 }}>
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
        midPrice={midPrice}
        onChangeMidPrice={setMidPrice}
        currentPairReversed={null}
      />
    </div>
  )
})
