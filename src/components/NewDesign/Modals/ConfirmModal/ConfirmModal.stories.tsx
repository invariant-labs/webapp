import React from 'react'
import { storiesOf } from '@storybook/react'
import { ConfirmModal } from './ConfirmModal'

storiesOf('modals/newconnectWallet', module).add('default', () => (
  <ConfirmModal
    title={'Claim confirmation'}
    desc={
      'You are about to claim the fee that has been unclaimed. This action is irreversible. Are you sure you want to continue?'
    }
  />
))
