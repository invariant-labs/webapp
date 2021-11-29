import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { useState } from '@storybook/client-api'
import AnimateButton from '@components/NewDesign/AnimatedButton/AnimatedButton'
import { ProgressState } from './AnimatedButton'
import { colors } from '@static/theme'

storiesOf('buttons/AnimatedButtons', module)
  .addDecorator(withKnobs)
  .add('primary', () => {
    const [progress, setProgress] = useState<ProgressState>('none')
    return <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <AnimateButton content={'Add liquidity'} progress={progress} />
      <button onClick={() => { setProgress('failed') }}>Approve transaction</button>
    </div>
  })
