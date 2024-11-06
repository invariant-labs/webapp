import React from 'react'
import useStyles from './style'
import { Button } from '@mui/material'
import classNames from 'classnames'

export interface IProps {
  name: string
  active?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  disabled?: boolean
  startIcon?: JSX.Element
}
export const NavbarButton: React.FC<IProps> = ({
  name,
  active,
  onClick,
  className,
  disabled = false,
  startIcon
}) => {
  const { classes } = useStyles()
  return (
    <Button
      className={classNames(className, classes.button, active ? classes.active : undefined)}
      variant='contained'
      classes={{ disabled: classes.disabled }}
      disabled={disabled}
      type={onClick ? 'button' : 'submit'}
      startIcon={startIcon}
      onClick={onClick}>
      {name}
    </Button>
  )
}
export default NavbarButton
