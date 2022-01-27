
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoLabel } from '@components/IDO/IdoLabel/IdoLabel'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'
import invariantLogo from "/src/static/png/invariant-logo.png"

storiesOf('IDO/IdoLabel5', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>

<IdoLabel name="Invariant for sale" amount= "20 000 000" logoSrc= {invariantLogo} hasBottomBorder={true} />


        
    </div>
  ))
  .add('hover', () => (
    <div >

<IdoLabel name="Invariant for sale" amount= "20 000 000" logoSrc= {invariantLogo} hasBottomBorder={true} isDarkBg={true} />


    </div>
  ))
  
