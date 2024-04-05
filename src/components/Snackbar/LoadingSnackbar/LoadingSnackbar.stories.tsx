import React from 'react'
import { storiesOf } from '@storybook/react'
import LoadingSnackbar from './LoadingSnackbar'

storiesOf('newUi/loadingSnackbar', module).add('default', () => {
  return (
    <LoadingSnackbar
      message='Loading, please wait...'
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      hideIconVariant
      iconVariant={{
        empty: <div />
      }}
      id='id'
      persist={false}
      style={{}}
      variant='pending'
    />
  )
})
