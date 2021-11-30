import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { OutlinedButton } from '@components/NewDesign/OutlinedButton/OutlinedButton'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'

storiesOf('buttons/OutlinedButton', module)
  .addDecorator(withKnobs)
  .add('primary', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <OutlinedButton name='Mint' color='primary' onClick={action('clicked')} />
    </div>
  ))
  .add('secondary', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <OutlinedButton name='Mint' color='secondary' onClick={action('clicked')} />
    </div>
  ))
  .add('primary:disabled', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <OutlinedButton name='Mint' disabled={true} color='primary' onClick={action('clicked')} />
    </div>
  ))
  .add('secondary:disabled', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <OutlinedButton name='Mint' disabled={true} color='secondary' onClick={action('clicked')} />
    </div>
  ))
  .add('animated', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <OutlinedButton name='Mint' disabled={false} color='secondary'
      />
    </div>
  ))
