import React, { ChangeEvent } from 'react'
import { Slider } from '@material-ui/core'
import { useStyles } from './style'

export interface IProps {
  values: number[]
  valueChangeHandler: (value: number) => void
  defaultValueIndex?: number
}

export const ConcentrationSlider: React.FC<IProps> = ({ values, valueChangeHandler, defaultValueIndex = 0 }) => {
  const classes = useStyles()

  const onChange = (_e: ChangeEvent<{}>, value: number | number[]) => {
    valueChangeHandler(value as number)
  }

  const marks = values.map((value, index) => ({
    value,
    label: index === 0 || index === values.length - 1 ? `${value}x` : ''
  }))

  const valueLabelFormat = (value: number) => `${value}x`

  return (
    <Slider
      classes={classes}
      onChangeCommitted={onChange}
      marks={marks}
      min={values[0]}
      max={values[values.length - 1]}
      step={null}
      valueLabelDisplay='on'
      valueLabelFormat={valueLabelFormat}
      defaultValue={values[defaultValueIndex]}
    />
  )
}

export default ConcentrationSlider
