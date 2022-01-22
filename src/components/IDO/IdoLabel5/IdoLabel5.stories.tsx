import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoLabel5 } from '@components/IDO/IdoLabel5/IdoLabel5'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'
import invariantLogo from "/src/static/png/invariant-logo.png"

storiesOf('IDO/IdoLabel5', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>

<IdoLabel5 name="Invariant for sale" amount= "20 000 000" logoSrc= {invariantLogo} hasBottomBorder={true} />


        
    </div>
  ))
  .add('hover', () => (
    <div >

<IdoLabel5 name="Invariant for sale" amount= "20 000 000" logoSrc= {invariantLogo} hasBottomBorder={true} isDarkBg={true} />


    </div>
  ))
  
