import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { WideButton } from '@components/WideButton/WideButton'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'

storiesOf('buttons/ConnectButton', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: colors.invariant.component, padding: '10px' }}>
      <WideButton name='Connect a wallet' onClick={action('clicked')} />
    </div>
  ))
