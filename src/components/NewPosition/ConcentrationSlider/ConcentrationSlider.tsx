import React, { ChangeEvent } from 'react'
import { Grid, Slider, Typography } from '@material-ui/core'
import { useSliderStyles, useThumbStyles } from './style'

export interface IProps {
  values: number[]
  valueChangeHandler: (value: number) => void
  valueIndex: number
  unsafePercent: number
}

interface ThumbProps extends React.HTMLAttributes<HTMLSpanElement> {
  concentrationValues: number[]
}

const Thumb: React.FC<ThumbProps> = ({ concentrationValues, ...props }) => {
  const classes = useThumbStyles()

  return (
    <Grid {...props} className={classes.root} style={props.style} container item alignItems='center' direction='column'>
      <Grid className={classes.labelWrapper}>
        <Typography className={classes.label}>{concentrationValues[props['aria-valuenow'] ?? 0].toFixed(1)}x</Typography>
      </Grid>

      <Grid className={classes.outerCircle}>
        <Grid className={classes.innerCircle} />
      </Grid>
    </Grid>
  )
}

export const ConcentrationSlider: React.FC<IProps> = ({ values, valueChangeHandler, valueIndex, unsafePercent }) => {
  const sliderClasses = useSliderStyles({ valuesLength: values.length, unsafePercent })

  const onChange = (_e: ChangeEvent<{}>, value: number | number[]) => {
    valueChangeHandler(value as number)
  }

  const marks = values.map((value, index) => ({
    value: index,
    label: index === 0 || index === values.length - 1 ? `${value.toFixed(1)}x` : undefined
  }))

  return (
    <Slider
      classes={sliderClasses}
      onChange={onChange}
      marks={marks}
      min={0}
      max={values.length - 1}
      value={valueIndex}
      ThumbComponent={(props) => (
        <Thumb
          concentrationValues={values}
          {...props}
        />
      )}
      track={false}
    />
  )
}

export default ConcentrationSlider
