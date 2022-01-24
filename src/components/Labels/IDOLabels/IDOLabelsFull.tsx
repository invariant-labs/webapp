import React, { ReactElement } from 'react'
import useStyle from './style'
import IDOLabels, { IIDOLabelsProps } from './IDOLabels'

export interface IDOLabelsFull {
  labels: IIDOLabelsProps[]
}

export const IDOLabelsFull: React.FC<IDOLabelsFull> = ({ labels }) => {
  const classes = useStyle()
  return (
    <div>
      {labels.map(label => (
        <IDOLabels
          className={label.className}
          title={label.title}
          icon={label.icon}
          value={label.value}
        />
      ))}
    </div>
  )
}
