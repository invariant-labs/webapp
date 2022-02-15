import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import Volume from './Volume'

storiesOf('position/Stats', module)
  .addDecorator(withKnobs)
  .add('volume24', () => {
    const [percerentVolume] = React.useState<number>(1.14)
    const [volume] = React.useState<number>(231258435934)
    const [data] = React.useState([
      {
        timeStamp: '1AM',
        value: 120
      },
      {
        timeStamp: '4AM',
        value: 35
      },
      {
        timeStamp: '7AM',
        value: 33
      },
      {
        timeStamp: '10AM',
        value: 27
      },
      {
        timeStamp: '1PM',
        value: 199
      },
      {
        timeStamp: '4PM',
        value: 117
      },
      {
        timeStamp: '7PM',
        value: 100
      },
      {
        timeStamp: '10PM',
        value: 200
      },
      {
        timeStamp: '10PM',
        value: 200
      }
    ])

    return <Volume data={data} percentVolume={percerentVolume} volume={volume} />
  })
