import React from 'react'
import { storiesOf } from '@storybook/react'
import { JupiterIndexedIndicator } from './JupiterIndexedIndicator'

storiesOf('position/indicatorButtons', module)
  .add('Indexed', () => (
    <JupiterIndexedIndicator isCurrentPoolExisting={true} showNoConnected={false} poolAddress='' />
  ))
  .add('Not indexed', () => (
    <JupiterIndexedIndicator
      isCurrentPoolExisting={true}
      showNoConnected={false}
      poolAddress='2SgUGxYDczrB6wUzXHPJH65pNhWkEzNMEx3km4xTYUTC'
    />
  ))
