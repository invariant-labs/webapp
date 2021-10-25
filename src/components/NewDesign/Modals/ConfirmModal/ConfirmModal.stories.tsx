import React from 'react'
import { storiesOf } from '@storybook/react'
import { ConfirmModal } from './ConfirmModal'
let open = true
const handleClose = () => {
  open = false
}
const handleClaim = () => {
  console.log('claim')
  handleClose()
}

storiesOf('modals/newconfirmation', module).add('default', () => (
  <ConfirmModal
    title={'Claim confirmation'}
    desc={
      'You are about to claim the fee that has been unclaimed. This action is irreversible. Are you sure you want to continue?'
    }
    action1={'Cancel'}
    action2={'Claim'}
    handleAction1={handleClose}
    handleAction2={handleClaim}
    open={open}
  />
))
