import { store } from '@store/index'
import CustomSnackbar from './CustomSnackbar'
import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

const meta = {
  title: 'Components/CustomSnackbar',
  component: CustomSnackbar,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <SnackbarProvider maxSnack={99}>
            <Story />
          </SnackbarProvider>
        </MemoryRouter>
      </Provider>
    )
  ],
  args: {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    snackbarId: '1',
    style: {},

    hideIconVariant: false,
    id: '1',
    persist: true,
    iconVariant: {}
  }
} satisfies Meta<typeof CustomSnackbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: 'Snackbar mock message',
    variant: 'default'
  }
}

export const Loading: Story = {
  args: {
    message: 'Snackbar mock message',
    variant: 'pending'
  }
}
