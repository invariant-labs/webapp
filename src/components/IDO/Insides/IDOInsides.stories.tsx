import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IDOInsides } from '@components/IDO/Insides/IDOInsides'
import { colors } from '@static/theme'

storiesOf('insides/IDOInsides', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div style={{ backgroundColor: colors.invariant.component }}>
        <IDOInsides
          valuexUSD={46.643}
          valueUSD={47.43}
          valueSOL={0.0432}
          valuexETH={'0.0000'}
          valuexBTC={'0.0000'}
        />
      </div>
    )
  })
