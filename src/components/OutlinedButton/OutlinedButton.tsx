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
  balance: string | undefined
}

export const OutlinedButton: React.FC<IProps> = ({
  name,
  onClick,
  color = 'primary',
  className,
  disabled = false,
  startIcon,
  labelClassName,
  balance
}) => {
  const classes = useStyles()

  const tokenBalance = isNaN(Number(balance))
  const disabledButton = disabled && tokenBalance

  return (
    <Button
      className={classNames(
        classes.general,
        !isNaN(Number(balance)) && classes.activeButton,
        className
      )}
      variant='contained'
      color={color}
      classes={{ disabled: classes.disabled, label: classNames(labelClassName) }}
      disabled={disabledButton}
      type={onClick ? 'button' : 'submit'}
      startIcon={startIcon}
      onClick={onClick}>
      {name}
    </Button>
  )
}
