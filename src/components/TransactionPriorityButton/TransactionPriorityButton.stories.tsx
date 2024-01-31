import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import TransactionPriorityButton from './TransactionPriorityButton'

const buttonsParams = [
  { label: 'High', value: 0.05, description: '5x Market fee' },
  { label: 'Turbo', value: 0.1, description: '10x Market fee' }
]

storiesOf('buttons/transactionPriorityButton', module)
  .addDecorator(withKnobs)
  .add('set priority', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      {buttonsParams.map((params, index) => {
        return (
          <TransactionPriorityButton
            selected={index === 0}
            index={index}
            label={params.label}
            value={params.value}
            description={params.description}
            onClick={() => {}}
          />
        )
      })}
    </div>
  ))
