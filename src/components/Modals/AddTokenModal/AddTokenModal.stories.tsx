import React from 'react'
import { storiesOf } from '@storybook/react'
import AddTokenModal from './AddTokenModal'

storiesOf('modals/AddToken', module).add('default', () => (
  <AddTokenModal open={true} handleClose={() => {}} addToken={() => {}} />
))
