import React, { ChangeEvent } from 'react'
import { Grid, Slider, Typography } from '@material-ui/core'
import { useSliderStyles, useThumbStyles } from './style'

export interface IProps {
  values: number[]
  valueChangeHandler: (value: number) => void
  defaultValueIndex?: number
}

const Thumb: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const classes = useThumbStyles()

  return (
    <Grid {...props} className={classes.root} style={props.style} container item alignItems='center' direction='column'>
      <Grid className={classes.labelWrapper}>
        <Typography className={classes.label}>{props['aria-valuenow']}x</Typography>
      </Grid>

      <Grid className={classes.outerCircle}>
        <Grid className={classes.innerCircle} />
      </Grid>
    </Grid>
  )
}

export const ConcentrationSlider: React.FC<IProps> = ({ values, valueChangeHandler, defaultValueIndex = 0 }) => {
  const sliderClasses = useSliderStyles({ valuesLength: values.length })

  const onChange = (_e: ChangeEvent<{}>, value: number | number[]) => {
    valueChangeHandler(value as number)
  }

  const marks = values.map((value, index) => ({
    value,
    label: index === 0 || index === values.length - 1 ? `${value}x` : undefined
  }))

  return (
    <Slider
      classes={sliderClasses}
      onChange={onChange}
      marks={marks}
      min={values[0]}
      max={values[values.length - 1]}
      step={null}
      valueLabelDisplay='on'
      defaultValue={values[defaultValueIndex]}
      ThumbComponent={Thumb}
    />
  )
}

export default ConcentrationSlider
