import { PaginationList } from './Pagination'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/PaginationList',
  component: PaginationList
} satisfies Meta<typeof PaginationList>

export default meta
type Story = StoryObj<typeof meta>

const handleChange = (page: number): void => {
  console.log(page)
}

export const Primary: Story = {
  args: {
    pages: 10,
    defaultPage: 5,
    handleChangePage: handleChange,
    variant: 'end'
  }
}
