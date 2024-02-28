import { storiesOf } from '@storybook/react'
import React from 'react'
import Jupiter from './Jupiter'

storiesOf('modals/jupiter', module).add('active', () => (
  <Jupiter open={true} handleClose={() => {}} anchorEl={null} active={true} />
))
storiesOf('modals/jupiter', module).add('inactive', () => (
  <Jupiter open={true} handleClose={() => {}} anchorEl={null} active={false} />
))
