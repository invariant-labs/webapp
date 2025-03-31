import React from 'react'
import useStyles from './style'
import { Box, Button, Typography } from '@mui/material'
import { colors } from '@static/theme'

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
        <Box className={classes.tileWrapper}>
          <Box style={{ color: colors.invariant.text, lineHeight: '12px', textAlign: 'left' }}>
            {children}
          </Box>
          <Typography className={classes.labelWrapper}>Get tokens</Typography>
        </Box>
      </Button>
    </>
  )
}

export default FaucetButton
