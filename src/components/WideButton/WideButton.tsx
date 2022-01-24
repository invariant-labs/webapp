import React, { ReactElement } from 'react'
import { Button, PropTypes } from '@material-ui/core'
import { FontWeightProperty, PaddingProperty } from 'csstype'
import classNames from 'classnames'
import useStyles from './style'

export interface IWideButtonProps {
  name: ReactElement | string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  color?: PropTypes.Color
  className?: string
  style?: React.CSSProperties
  labelClassName?: string
}

export const WideButton: React.FC<IWideButtonProps> = ({
  name,
  onClick,
  color = 'primary',
  className,
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
      onClick={onClick}
    >
      {name}
    </Button>
  )
}

export default WideButton
