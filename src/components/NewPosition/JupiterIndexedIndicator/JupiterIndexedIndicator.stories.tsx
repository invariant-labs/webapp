import { colors } from '@static/theme'
import { storiesOf } from '@storybook/react'
import React from 'react'
import JupiterIndexedIndicator from './JupiterIndexedIndicator'

storiesOf('position/JupiterIndexedIndicator', module)
  .add('Indexed', () => (
    <div
      style={{
        backgroundColor: colors.invariant.component,
        padding: 40
      }}>
      <JupiterIndexedIndicator
        isIndexed={true}
        onClick={() => {
          alert('clicked')
        }}
      />
    </div>
  ))
  .add('Not indexed', () => (
    <div
      style={{
        backgroundColor: colors.invariant.component,
        padding: 40
      }}>
      <JupiterIndexedIndicator
        isIndexed={false}
        onClick={() => {
          alert('clicked')
        }}
      />
    </div>
  ))
