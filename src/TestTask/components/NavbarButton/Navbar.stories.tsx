import React from 'react'
import { storiesOf } from '@storybook/react'

import NavbarButton from './NavbarButton'

import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'

storiesOf('test/components/NavbarButtons', module)
  .addDecorator(withKnobs)
  .add('buttons', () => (
    <div
      style={{
        backgroundColor: colors.black.header,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '10px',
        margin: 'auto',
        maxWidth: '380.06px'
      }}>
      <NavbarButton name='Pool' onClick={action('clicked')} />
      <NavbarButton name='Swap' onClick={action('clicked')} />
      <NavbarButton name='Stats' onClick={action('clicked')} />
      <NavbarButton name='Farm' onClick={action('clicked')} />
      <NavbarButton name='Bond' onClick={action('clicked')} />
    </div>
  ))
