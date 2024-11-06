import React from 'react'
import useStyles from './style'
import { Button } from '@mui/material'

export interface IProps {
  onFaucet: () => void
  disabled?: boolean
  children?: React.ReactNode
}

export const FaucetButton: React.FC<IProps> = ({ onFaucet, disabled = false, children }) => {
  const { classes } = useStyles()

  return (
    <>
      <Button
        className={classes.headerButton}
        variant='contained'
        classes={{ disabled: classes.disabled }}
        disabled={disabled}
        onClick={onFaucet}>
        {children}
      </Button>
    </>
  )
}

export default FaucetButton
