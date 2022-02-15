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
        value: [321, 312, 31, 456, 35, 21, 76, 22, 76, 22, 44, 21]
      },
      {
        timeStamp: '4AM',
        value: [321, 312, 31, 456, 35, 21, 76, 22, 76, 22, 44, 21]
      },
      {
        timeStamp: '7AM',
        value: [321, 312, 31, 456, 35, 21, 76, 22, 76, 22, 44, 21]
      },
      {
        timeStamp: '10AM',
        value: [321, 312, 31, 456, 35, 21, 76, 22, 76, 22, 44, 21]
      },
      {
        timeStamp: '1PM',
        value: [321, 312, 31, 456, 35, 21, 76, 22, 76, 22, 44, 21]
      },
      {
        timeStamp: '4PM',
        value: [321, 312, 31, 456, 35, 21, 76, 22, 76, 22, 44, 21]
      },
      {
        timeStamp: '7PM',
        value: [321, 312, 31, 456, 35, 21, 76, 22, 76, 22, 44, 21]
      },
      {
        timeStamp: '10PM',
        value: [321, 312, 31, 456, 35, 21, 76, 22, 76, 22, 44, 21]
      },
      {
        timeStamp: '10PM',
        value: [321, 312, 31, 456, 35, 21, 76, 22, 76, 22, 44, 21]
      }
    ])

    return <Volume data={data} percentVolume={percerentVolume} volume={volume} />
  })
