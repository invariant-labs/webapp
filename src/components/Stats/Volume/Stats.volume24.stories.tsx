import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { useAddonState } from '@storybook/store'
import Volume from './Volume'

storiesOf('position/Stats', module)
  .addDecorator(withKnobs)
  .add('volume24', () => {
    const [data, setData] = useAddonState<Array<{ timestamp: number; value: number }>>('time', [])

    const timeSlicer = 10
    let timeCreator = 60

    React.useEffect(() => {
      const data: Array<{ timestamp: number; value: number }> = []

      for (let i = 0; timeCreator < 24 * 60; i++) {
        const hours = ~~(timeCreator / 60)
        const minutes = timeCreator % 60

        const dayTime = '2022'
        const dayMonth = 'Wed'
        const monthDay = 'Feb'
        const dayNumber = '16'

        const correctMinute = minutes < 10 ? `0${minutes}` : minutes
        const correctHour = hours < 10 ? `0${hours}` : hours
        const simulateTime = `${dayMonth} ${monthDay} ${dayNumber} ${dayTime} ${correctHour}:${correctMinute}:00`
        const unix = new Date(simulateTime).getTime()

        const obj = { timestamp: unix, value: ~~(Math.random() * ~~(timeCreator / 60) + 2) }

        data.push(obj)
        timeCreator = timeCreator + timeSlicer
      }

      setData(data)
    }, [])

    return <Volume data={data} percentVolume={1.14} volume={231258435934} />
  })
