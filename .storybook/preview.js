import React from 'react'

import { addDecorator, addParameters } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import { themes } from '@storybook/theming'
import { theme } from '../src/static/theme'
import { StylesProvider } from '@material-ui/core'
import { MemoryRouter } from 'react-router'
import { withMaterialStyles } from './decorators'
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'
addDecorator(muiTheme([theme]))
addDecorator(withMaterialStyles)
// addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
addParameters({
  backgrounds: [
    { name: 'dark', value: '#202020', default: true },
    { name: 'light', value: '#FFFFFF' }
  ],
  options: { theme: themes.dark }
})

const customViewports = {
  sx375: {
    name: 'xs-360',
    styles: {
      width: '360px',
      height: '360px'
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

export const parameters = {
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...customViewports
    }
  }
}
