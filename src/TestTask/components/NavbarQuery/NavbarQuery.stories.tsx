import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import RoutesModal from '@components/Modals/RoutesModal/RoutesModal'
import { MemoryRouter } from 'react-router'

const routes = ['pool', 'swap', 'stats', 'farm', 'bond']

storiesOf('test/components/NavbarQuery', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('default', () => (
    <RoutesModal
      routes={routes}
      open={true}
      anchorEl={null}
      handleClose={() => {}}
      onSelect={(selected: string) => action('chosen: ' + selected)()}
    />
  ))
