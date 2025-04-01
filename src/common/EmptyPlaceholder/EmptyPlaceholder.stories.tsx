import { EmptyPlaceholder } from './EmptyPlaceholder'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Common/EmptyPlaceholder',
  component: EmptyPlaceholder
} satisfies Meta<typeof EmptyPlaceholder>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    desc: 'Add your first position by pressing the button and start earning!'
  },
  render: args => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
          backgroundColor: '#f0f0f0'
        }}>
        <EmptyPlaceholder {...args} />
      </div>
    )
  }
}
