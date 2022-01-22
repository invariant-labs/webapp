import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoLabel2} from '@components/IDO/IdoLabel2/IdoLabel2'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'
import invariantLogo from "/src/static/png/invariant-logo.png"

storiesOf('IDO/IdoLabel2', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>

<IdoLabel2 name="Grace period ends in" amount= "32:29:27" logoSrc="clock" isDarkBg={true} />


        
    </div>
  ))
  .add('hover', () => (
    <div >

<IdoLabel2 name="Grace period ends in" amount= "32:29:17" logoSrc="clock"  />


    </div>
  ))
  
