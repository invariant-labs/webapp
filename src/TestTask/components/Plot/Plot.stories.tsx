import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { useAddonState } from '@storybook/store'
import Plot from './Plot'

storiesOf('test/components/Plot', module)
  .addDecorator(withKnobs)
  .add('liquidity', () => {
    const [data, setData] = useAddonState<Array<{ timestamp: number; value: number }>>('time', [])

    React.useEffect(() => {
      const data: Array<{ timestamp: number; value: number }> = []
      for (let i = 2; i <= 25; i++) {
        data.push({
          timestamp: i * 1000 * 60 * 60 + 1000 * 60 * 60 * 24,
          value: Math.random()
        })
      }
      setData(data)
    }, [])

    return (
      <div style={{ maxWidth: 256, margin: 'auto' }}>
        <Plot
          currencyType={'SNY'}
          liquidityPercent={-4.14}
          liquidityVolume={383575527255}
          data={data}
          rate={2}
        />
      </div>
    )
  })
