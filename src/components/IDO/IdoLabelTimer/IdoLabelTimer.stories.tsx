
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoLabelTimer} from '@components/IDO/IdoLabelTimer/IdoLabelTimer'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'
import invariantLogo from "/src/static/png/invariant-logo.png"

storiesOf('IDO/IdoLabelTimer', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>

<IdoLabelTimer name="Grace period ends in" periodEnd= "22 Feb 2022 23:59:00 GMT" logoSrc="clock" isDarkBg={true} />


        
    </div>
  ))
  .add('hover', () => (
    <div >

<IdoLabelTimer name="Grace period ends in" periodEnd= "22 Feb 2022 23:59:00 GMT" logoSrc="clock"  />


    </div>
  ))
  
