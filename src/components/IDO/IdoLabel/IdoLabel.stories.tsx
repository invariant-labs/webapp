
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoLabel } from '@components/IDO/IdoLabel/IdoLabel'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'

storiesOf('IDO/IdoLabel', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>
      <IdoLabel name="Estimated Token Price" amount= "122 354 345" onHover={action('hover')} logoSrc= "/src/static/png/invariant-logo.png"  />
    </div>
  ))
  .add('hover', () => (
    <div style={{ }}>
      <IdoLabel name="Estimated Token Price" amount= "122 354 345" />
    </div>
  ))
  
/*

isDarkBg= {true} 
hasTopBorder= {true}

*/
