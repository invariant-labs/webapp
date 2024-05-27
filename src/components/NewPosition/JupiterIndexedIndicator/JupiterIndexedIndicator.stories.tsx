import React from 'react'
import { storiesOf } from '@storybook/react'
import { JupiterIndexedIndicator } from './JupiterIndexedIndicator'

storiesOf('buttons/indicatorButtons', module).add('default', () => (
  <JupiterIndexedIndicator isCurrentPoolExisting={true} poolAddress='' />
))
