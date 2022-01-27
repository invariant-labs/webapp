
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoLabel } from '@components/IDO/IdoLabel/IdoLabel'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'
import invariantLogo from "/src/static/png/invariant-logo.png"

storiesOf('IDO/IdoLabel3', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>

<IdoLabel name="SOL Contributed" amount= "122 124 846"  />


        
    </div>
  ))
  .add('hover', () => (
    <div >

<IdoLabel name="SOL Contributed" amount= "122 124 846" isDarkBg={true}/>


    </div>
  ))
  
