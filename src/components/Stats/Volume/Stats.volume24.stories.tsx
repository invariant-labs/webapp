import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { useAddonState } from '@storybook/store'
import Volume from './Volume'

storiesOf('position/Stats', module)
  .addDecorator(withKnobs)
  .add('volume24', () => {
    const [data, setData] = useAddonState<Array<{ timestamp: number; value: number }>>('time', [])

    React.useEffect(() => {
      const data: Array<{ timestamp: number; value: number }> = []

      for (let i = 0; i < 30; i++) {
        data.push({
          timestamp: i * 1000 * 60 * 60 * 24,
          value: Math.random()
        })
      }

      setData(data)
    }, [])

    return <Volume data={data} percentVolume={1.14} volume={231258435934} />
  })
