import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { ConnectButton } from '@components/ConnectButton/ConnectButton'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'

storiesOf('buttons/ConnectButton', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: colors.invariant.component, padding: '10px' }}>
      <ConnectButton name='Connect a wallet' color='secondary' onClick={action('clicked')} />
    </div>
  ))
