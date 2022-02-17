import React from 'react'
import { colors } from '@static/theme'

interface toolTipInterface {
  data: {
    timeStamp: string
  }
  color: string
}

const tooltip = ({ data, color }: toolTipInterface) => {
  return (
    <div
      style={{
        background: colors.white.main,
        width: 100,
        height: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        color
      }}>
      <strong>{data.timeStamp}</strong>
    </div>
  )
}

export default tooltip
