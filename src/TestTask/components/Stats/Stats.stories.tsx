import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { useAddonState } from '@storybook/store'

import Stats from './Stats'

storiesOf('test/components/Stats', module)
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
        <Stats
          rate={2}
          currencyType={'SNY'}
          liquidityPercent={-4.14}
          liquidityVolume={383575527255}
          data={data}
          balance={'460'}
          value={''}
        />
      </div>
    )
  })
