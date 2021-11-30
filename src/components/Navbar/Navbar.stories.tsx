import React from 'react'
import { storiesOf } from '@storybook/react'
import NavbarButton from './Button'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'

storiesOf('newnavbar/buttons', module)
  .addDecorator(withKnobs)
  .add('buttons', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '10px' }}>
      <NavbarButton name='Staking' onClick={action('clicked')} />
      <NavbarButton name='Stats' onClick={action('clicked')} />
      <NavbarButton name='Exchange' onClick={action('clicked')} />
    </div>
  ))
