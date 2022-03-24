import React, { ChangeEvent, useCallback } from 'react'
import { Grid, Slider, Typography } from '@material-ui/core'
import { useSliderStyles, useThumbStyles } from './style'

export interface IProps {
  values: number[]
  valueChangeHandler: (value: number) => void
  valueIndex: number
  unsafePercent: number
  dragHandler: (value: number) => void
}

interface ThumbProps extends React.HTMLAttributes<HTMLSpanElement> {
  concentrationValues: number[]
}

const Thumb: React.FC<ThumbProps> = ({ concentrationValues, ...props }) => {
  const classes = useThumbStyles()

  return (
    <Grid
      {...props}
      className={classes.root}
      style={props.style}
      container
      item
      alignItems='center'
      direction='column'>
      <Grid className={classes.labelWrapper}>
        <Typography className={classes.label}>
          {concentrationValues[props['aria-valuenow'] ?? 0].toFixed(0)}x
        </Typography>
      </Grid>

      <Grid className={classes.outerCircle}>
        <Grid className={classes.innerCircle} />
      </Grid>
    </Grid>
  )
}

export const ConcentrationSlider: React.FC<IProps> = ({
  values,
  valueChangeHandler,
  valueIndex,
  unsafePercent,
  dragHandler
}) => {
  const sliderClasses = useSliderStyles({ valuesLength: values.length, unsafePercent })

  const onChangeCommited = useCallback(
    (_e: ChangeEvent<{}>, value: number | number[]) => {
      valueChangeHandler(value as number)
    },
    [valueChangeHandler]
  )

  const onChange = useCallback(
    (_e: ChangeEvent<{}>, value: number | number[]) => {
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
      classes={sliderClasses}
      onChangeCommitted={onChangeCommited}
      onChange={onChange}
      marks={marks}
      min={0}
      max={values.length - 1}
      value={valueIndex}
      ThumbComponent={props => <Thumb concentrationValues={values} {...props} />}
      track={false}
    />
  )
}

export default ConcentrationSlider
