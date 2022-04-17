import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { useAddonState } from '@storybook/store'

import Info from './Info'

storiesOf('test/components/Info', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const [data, setData] = useAddonState<Array<{ timestamp: number; value: number }>>('time', [])

    React.useEffect(() => {
      const data: Array<{ timestamp: number; value: number }> = []
      for (let i = 2; i < 26; i++) {
        data.push({
          timestamp: i * 60 * 60 * 1000 + 1000 * 60 * 60 * 24 + 1,
          value: Math.random()
        })
      }
      setData(data)
    }, [])

    return (
      <div style={{ maxWidth: 224, margin: 'auto' }}>
        <Info amount={'12.43'} currencyType={'SNY'} balance={'463.543'} />
      </div>
    )
  })
