
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { ConnectWalletButton } from '@components/IDO/ConnectWalletButton/ConnectWalletButton'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'

storiesOf('IDO/ConnectWalletButton', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <ConnectWalletButton name='Connect Wallet' color='secondary' onHover={action('hover')} />
    </div>
  ))
  .add('hover', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <ConnectWalletButton name='Connect Wallet' color='secondary' />
    </div>
  ))
  
