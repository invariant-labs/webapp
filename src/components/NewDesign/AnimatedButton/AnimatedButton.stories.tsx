import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import AnimateButton from '@components/NewDesign/AnimatedButton/AnimatedButton'
import { colors } from '@static/theme'

const result: boolean = false

storiesOf('buttons/AnimatedButtons', module)
  .addDecorator(withKnobs)
  .add('primary', () => {
    return <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <AnimateButton content={'Add liquidity'} approve={false} result={result} />
    </div>
  })
