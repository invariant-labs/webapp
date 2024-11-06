import type { Preview } from '@storybook/react'
import { withRouter } from 'storybook-addon-remix-react-router'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { theme } from '../src/static/theme'

const customViewports = {
  sx375: {
    name: 'xs-375',
    styles: {
      width: '375px',
      height: '375px'
    }
  },
  sm450: {
    name: 'sm-450',
    styles: {
      width: '450px',
      height: '450px'
    }
  },
  md600: {
    name: 'md-600',
    styles: {
      width: '600px',
      height: '600px'
    }
  },
  lg960: {
    name: 'lg-960',
    styles: {
      width: '960px',
      height: '960px'
    }
  },
  xl1280: {
    name: 'xl-1280',
    styles: {
      width: '1280px',
      height: '1280px'
    }
  }
}

const preview: Preview = {
  parameters: {
    themes: {
      themeOverride: 'dark'
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    viewport: {
      viewports: {
        ...customViewports
      }
    },
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#202020'
        },
        {
          name: 'light',
          value: '#FFFFFF'
        }
      ]
    },
    createBrowserRouter: { withRouter }
  },

  decorators: [
    withThemeFromJSXProvider({
      themes: {
        dark: theme
      },
      defaultTheme: 'dark',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline
    })
  ]
}

export default preview

export const parameters = {}
