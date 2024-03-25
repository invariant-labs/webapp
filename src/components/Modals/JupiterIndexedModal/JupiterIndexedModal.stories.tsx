import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { JupiterIndexedModal, IJupiterIndexedModal } from './JupiterIndexedModal'

export default {
  title: 'JupiterIndexedModal',
  component: JupiterIndexedModal,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof JupiterIndexedModal>

const Template: Story<IJupiterIndexedModal> = args => <JupiterIndexedModal {...args} />

export const Active = Template.bind({})
Active.args = {
  poolIndexed: true,
  handleClose: () => console.log('Close modal'),
  open: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  poolIndexed: false,
  handleClose: () => console.log('Close modal'),
  open: true
}
