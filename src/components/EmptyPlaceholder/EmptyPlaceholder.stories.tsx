import React from 'react'
import { storiesOf } from '@storybook/react'
import EmptyPlaceholder from './EmptyPlaceholder'

storiesOf('emptyPlaceholder', module).add('empty', () => {
  return (
    <div style={{ padding: '14px 0', backgroundColor: 'rgb(29, 29, 73)' }}>
      <EmptyPlaceholder desc='Add your first position by pressing the button and start earning!' />
    </div>
  )
})
