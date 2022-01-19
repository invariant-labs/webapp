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
  startIcon?: JSX.Element
  fontWeight?: FontWeightProperty
  padding?: PaddingProperty<number>
  labelClassName?: string
}

export const ConnectButton: React.FC<IProps> = ({
  name,
  onClick,
  color = 'primary',
  className,
  startIcon,
  labelClassName
}) => {
  const classes = useStyles()
  return (
    <Button
      className={classNames(classes.general, className)}
      variant='contained'
      color={color}
      classes={{ label: classNames(labelClassName) }}
      type={onClick ? 'button' : 'submit'}
      startIcon={startIcon}
      onClick={onClick}
    >
      {name}
    </Button>
  )
}
