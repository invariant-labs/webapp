import React from 'react'
import useStyles from './style'
import { Box, Button, Typography } from '@mui/material'
import { colors, typography } from '@static/theme'

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%'
          }}>
          <Box style={{ color: colors.invariant.text, lineHeight: '12px', textAlign: 'left' }}>
            {children}
          </Box>
          <Typography
            style={{
              color: colors.invariant.textGrey,
              ...typography.caption4,
              marginTop: '4px',
              textAlign: 'left'
            }}>
            Get tokens
          </Typography>
        </Box>
      </Button>
    </>
  )
}

export default FaucetButton
