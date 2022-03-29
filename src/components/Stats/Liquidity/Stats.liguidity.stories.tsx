import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { useAddonState } from '@storybook/store'
import Liquidity from './Liquidity'

storiesOf('position/stats', module)
  .addDecorator(withKnobs)
  .add('liquidity', () => {
    const [data, setData] = useAddonState<Array<{ timestamp: number; value: number }>>('time', [])

    React.useEffect(() => {
      const data: Array<{ timestamp: number; value: number }> = []

      for (let i = 0; i < 30; i++) {
        data.push({
          timestamp: i * 1000 * 60 * 60 * 24 + 1,
          value: Math.random()
        })
      }

      setData(data)
    }, [])

    return <Liquidity liquidityPercent={-4.14} liquidityVolume={383575527255} data={data} />
  })
