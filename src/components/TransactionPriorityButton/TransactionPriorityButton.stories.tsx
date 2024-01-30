import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import TransactionPriorityButton from './TransactionPriorityButton'

const buttonsParams = [
  { label: 'High', value: 0.05, multiplier: 5 },
  { label: 'Turbo', value: 0.1, multiplier: 10 }
]

storiesOf('buttons/transactionPriorityButton', module)
  .addDecorator(withKnobs)
  .add('set priority', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      {buttonsParams.map((params, index) => {
        return (
          <TransactionPriorityButton
            selected={0 === index}
            index={index}
            label={params.label}
            value={params.value}
            multiplier={params.multiplier}
            onClick={() => {}}
          />
        )
      })}
    </div>
  ))
