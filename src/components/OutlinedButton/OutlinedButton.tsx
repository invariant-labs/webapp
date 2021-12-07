import React, { ReactElement } from 'react'
import { Button, PropTypes } from '@material-ui/core'
import { FontWeightProperty, PaddingProperty } from 'csstype'
import classNames from 'classnames'
import useStyles from './style'

export interface IProps {
  name: ReactElement | string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  color?: PropTypes.Color
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  startIcon?: JSX.Element
  fontWeight?: FontWeightProperty
  padding?: PaddingProperty<number>
  labelClassName?: string
}

export const OutlinedButton: React.FC<IProps> = ({
  name,
  onClick,
  color = 'primary',
  className,
  disabled = false,
  startIcon,
  labelClassName
}) => {
  const classes = useStyles()
  return (
    <Button
      className={classNames(classes.general, className)}
      variant='contained'
      color={color}
      classes={{ disabled: classes.disabled, label: classNames(labelClassName) }}
      disabled={disabled}
      type={onClick ? 'button' : 'submit'}
      startIcon={startIcon}
      onClick={onClick}>
      {name}
    </Button>
  )
}
