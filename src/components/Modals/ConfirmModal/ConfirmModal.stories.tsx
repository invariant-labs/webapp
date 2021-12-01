import React from 'react'
import { storiesOf } from '@storybook/react'
import { ConfirmModal } from './ConfirmModal'

storiesOf('modals/newconfirmation', module).add('default', () =>
  React.createElement(() => {
    const [open, setOpen] = React.useState(true)
    const handleClose = () => {
      setOpen(false)
    }
    const handleClaim = () => {
      console.log('claim')
      handleClose()
    }
    return (
      <ConfirmModal
        title={'Claim confirmation'}
        desc={
          'You are about to claim the fee that has been unclaimed. This action is irreversible. Are you sure you want to continue?'
        }
        confirm={'Claim'}
        handleCancel={handleClose}
        handleConfirm={handleClaim}
        open={open}
      />
    )
  })
)
