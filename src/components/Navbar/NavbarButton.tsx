import React from 'react'
import useStyles from './style'
import { Button } from '@mui/material'

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
  const { classes, cx } = useStyles()
  return (
    <Button
      className={cx(className, classes.button, active ? classes.active : undefined)}
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
