import React, { useCallback } from 'react'
import { useSliderStyles, useThumbStyles } from './style'
import { Grid, Slider, SliderThumb } from '@mui/material'

export interface IProps {
  values: number[]
  valueChangeHandler: (value: number) => void
  valueIndex: number
  dragHandler: (value: number) => void
  minimumSliderIndex: number
}

interface ThumbComponentProps extends React.HTMLAttributes<unknown> {}

function ThumbComponent(props: ThumbComponentProps) {
  const { classes } = useThumbStyles()
  const { children, ...other } = props
  return (
    <SliderThumb {...other} aria-label='slider thumb'>
      {children}
      <Grid className={classes.outerCircle}>
        <Grid className={classes.innerCircle} />
      </Grid>
    </SliderThumb>
  )
}

export const ConcentrationSlider: React.FC<IProps> = ({
  values,
  valueChangeHandler,
  valueIndex,
  dragHandler,
  minimumSliderIndex
}) => {
  const disabledPercentageRange = (100 * minimumSliderIndex) / values.length

  const { classes } = useSliderStyles({
    valuesLength: values.length,
    disabledRange: disabledPercentageRange
  })

  const onChangeCommitted = useCallback(
    (_e: Event | React.SyntheticEvent, value: number | number[]) => {
      valueChangeHandler(value as number)
    },
    [valueChangeHandler]
  )

  const onChange = useCallback(
    (_e: Event | React.SyntheticEvent, value: number | number[]) => {
      dragHandler(value as number)
    },
    [dragHandler]
  )

  const marks = values.map((value, index) => ({
    value: index,
    label: index === 0 || index === values.length - 1 ? `${value.toFixed(0)}x` : undefined
  }))

  return (
    <Slider
      classes={classes}
      onChange={onChange}
      onChangeCommitted={onChangeCommitted}
      marks={marks}
      min={0}
      max={values.length - 1}
      value={valueIndex}
      valueLabelDisplay='on'
      track={false}
      slots={{ thumb: ThumbComponent }}
      valueLabelFormat={value => `${values[value].toFixed(0)}x`}
    />
  )
}

export default ConcentrationSlider
