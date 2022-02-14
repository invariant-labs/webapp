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
        map: '1AM',
        dataA: 120,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '4AM',
        dataA: 35,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '7AM',
        dataA: 33,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '10AM',
        dataA: 27,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '1PM',
        dataA: 199,
        dataB: 76,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '4PM',
        dataA: 117,
        dataB: 200,
        dataC: 100,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '7PM',
        dataA: 100,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '10PM',
        dataA: 200,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      },
      {
        map: '10PM',
        dataA: 200,
        dataB: 200,
        dataC: 120,
        dataD: 321,
        dataE: 22,
        dataF: 55
      }
    ])

    const keys = data.map(({ map, ...rest }) => rest)

    const getKeys = keys
      .map(key => Object.keys(key))
      .reduce((array, isArray) => (Array.isArray(isArray) ? array.concat(isArray) : array))
    const uniqueKeys = [...new Set(getKeys)]

    return (
      <Volume data={data} percentVolume={percerentVolume} volume={volume} uniqueKeys={uniqueKeys} />
    )
  })
