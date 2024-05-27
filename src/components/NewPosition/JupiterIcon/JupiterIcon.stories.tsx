import React from 'react'
import { storiesOf } from '@storybook/react'
import { JupiterIcon } from './JupiterIcon'

storiesOf('position/jupiterIcon', module).add('Default', () => (
  <div>
    <JupiterIcon isIndexed={true} />
  </div>
))
