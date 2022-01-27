
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IdoDepositSol } from '@components/IDO/IdoDepositSol/IdoDepositSol'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'

storiesOf('IDO/IdoDepositSol', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: "#111931", padding: '10px' }}>
      <IdoDepositSol onHover={action('hover')} />
    </div>
  ))
  .add('hover', () => (
    <div style={{ backgroundColor: "#111931", padding: '10px' }}>
      <IdoDepositSol />
    </div>
  ))
  
