import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import AddTokenModal from './AddTokenModal'

const meta = {
  title: 'Modals/AddTokenModal',
  component: AddTokenModal,
  args: {}
} satisfies Meta<typeof AddTokenModal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    open: true,
    addToken: fn(),
    handleClose: fn()
  }
}
