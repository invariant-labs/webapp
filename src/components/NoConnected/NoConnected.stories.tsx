import { storiesOf } from '@storybook/react'
import React from 'react'
import { NoConnected } from './NoConnected'

storiesOf('liquidityPosition/noconnected', module).add('default', () => {
  return (
    <div style={{ background: '#F7F7F7', height: '100vh', width: '100vw' }}>
      <NoConnected onConnect={() => {}} descCustomText='You have no positions.' />
    </div>
  )
})
