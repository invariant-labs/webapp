import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import IdoTable from './IdoTable'



storiesOf('Ido/idoTable', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ width: 400 }}>
            <IdoTable
              saleTime={'15:30:33'}
              graceTime={'32:29:27'}
              sol={'122 124 846'}
              estPrice={'218.839'}
              invariant={'20 000 0000'}
            />
    </div>
  ))
