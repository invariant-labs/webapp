import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { toBlur } from '@consts/uiUtils'
import React from 'react'
import Priority from './Priority'

storiesOf('newUi/priority', module)
  .addDecorator(withKnobs)
  .add('priority', () => (
    <div style={{ width: 800 }} id={toBlur}>
      <Priority
        open={true}
        handleClose={() => {}}
        anchorEl={null}
        recentPriorityFee={0.05}
        priorityFeeOptions={[
          { label: 'Normal', value: 0.000005, description: '1x Market fee' },
          {
            label: 'Market',
            value: 0.001,
            description: '85% percentile fees from last 20 blocks'
          },
          { label: 'High', value: 0.05, description: '5x Market fee' },
          { label: 'Turbo', value: 0.1, description: '10x Market fee' }
        ]}
      />
    </div>
  ))
