import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoLabel} from '@components/IDO/IdoLabel/IdoLabel'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'
import invariantLogo from "/src/static/png/invariant-logo.png"

storiesOf('IDO/IdoLabel1', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>

<IdoLabel name="Sale period ends in" amount= "15:30:33" logoSrc="clock" hasTopBorder={true} />


        
    </div>
  ))
  .add('hover', () => (
    <div >

<IdoLabel name="Sale period ends in" amount= "15:30:33" logoSrc="clock" hasTopBorder={true} isDarkBg={true} />


    </div>
  ))
  
