import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { toBlur } from '@consts/uiUtils'
import { IdoStats } from './IdoStats'

storiesOf('newUi/ido', module)
  .addDecorator(withKnobs)
  .add('statList', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <IdoStats />
    </div>
  ))
