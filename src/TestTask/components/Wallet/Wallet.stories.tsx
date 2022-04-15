import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Wallet from './Wallet.component'

storiesOf('test/components/Wallet', module).add('default', () => <Wallet />)
