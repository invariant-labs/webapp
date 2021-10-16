import React from 'react'
import { StylesProvider } from '@material-ui/styles'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@storybook/theming'
import { theme } from '../src/static/theme'

export const withMaterialStyles = storyFn => (
  <StylesProvider injectFirst>{storyFn()}</StylesProvider>
)

export const withStore = store => storyFn => <Provider store={store}>{storyFn()}</Provider>
export default {
  withStore,
  withMaterialStyles
}
