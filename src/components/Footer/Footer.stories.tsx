import React from 'react'
import { storiesOf } from '@storybook/react'
import Footer from '@components/Footer/Footer'

storiesOf('Footer', module)
  .add('footer', () => {
    return (
      <div style={{ padding: '14px 0', backgroundColor: 'rgb(29, 29, 73)' }}>
        <Footer/>
      </div>
    )
  })
