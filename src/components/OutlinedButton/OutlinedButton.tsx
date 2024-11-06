import React, { ReactElement } from 'react'
import classNames from 'classnames'
import useStyles from './style'
import { Button, ButtonOwnProps } from '@mui/material'

export interface IProps {
  name: ReactElement | string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  color?: ButtonOwnProps['color']
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  startIcon?: JSX.Element
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
  const { classes } = useStyles()

  return (
    <Button
      className={classNames(classes.general, !disabled && classes.activeButton, className)}
      variant='contained'
      color={color}
      classes={{ disabled: classes.disabled }}
      disabled={disabled}
      type={onClick ? 'button' : 'submit'}
      startIcon={startIcon}
      onClick={onClick}
      sx={{ '& .MuiButton-label': classNames(labelClassName) }}>
      {name}
    </Button>
  )
}
