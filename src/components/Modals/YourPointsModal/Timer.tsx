import { Typography, Box, Button } from '@mui/material'
import { colors, typography } from '@static/theme'
import React from 'react'
import useStyles from './style'
import { useNavigate } from 'react-router-dom'

interface ITimerProps {
  hours: string
  minutes: string
  seconds: string
  handleClose: () => void
}

export const Timer: React.FC<ITimerProps> = ({ hours, minutes, seconds, handleClose }) => {
  const { classes } = useStyles()
  const navigate = useNavigate()

  return (
    <>
      <Typography style={{ color: colors.invariant.text }}>
        <span
          style={{
            color: colors.invariant.text,
            textAlign: 'center',
            textShadow: '0px 0px 5px #FFFFFF80'
          }}>
          Invariant Points launches in:
        </span>
      </Typography>

      <Box
        sx={{
          display: 'flex',
          textAlign: 'center',
          justifyItems: 'center',
          alignItems: 'center',
          width: '100%',
          marginTop: '8px'
        }}>
        <Box
          sx={{
            width: '57px',
            height: 'fit-content',
            padding: '6px',
            borderRadius: '4px',
            color: colors.invariant.text,
            fontWeight: 700,
            lineHeight: '20px',
            fontSize: '24px'
          }}>
          {hours}H
        </Box>
        <Box sx={{ paddingLeft: '2px', paddingRight: '2px' }}>
          <Typography style={{ ...typography.heading4, color: colors.invariant.text }}>
            :
          </Typography>
        </Box>
        <Box
          sx={{
            width: '57px',
            height: 'fit-content',
            padding: '6px',
            borderRadius: '4px',
            color: colors.invariant.text,
            fontWeight: 700,
            lineHeight: '20px',
            fontSize: '24px'
          }}>
          {minutes}M
        </Box>
        <Box sx={{ paddingLeft: '2px', paddingRight: '2px' }}>
          <Typography style={{ ...typography.heading4, color: colors.invariant.text }}>
            :
          </Typography>
        </Box>
        <Box
          sx={{
            width: '57px',
            height: 'fit-content',
            padding: '6px',
            borderRadius: '4px',
            color: colors.invariant.text,
            fontWeight: 700,
            lineHeight: '20px',
            fontSize: '24px'
          }}>
          {seconds}S
        </Box>
      </Box>
      <Button
        className={classes.button}
        style={{ marginTop: '16px' }}
        onClick={() => {
          handleClose()
          navigate('/points')
        }}>
        Go to Points Tab
      </Button>
    </>
  )
}
