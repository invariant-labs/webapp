import React from 'react'
import useStyles from './style'
import { Box, Button, Grid, Popover, Typography } from '@mui/material'
import { colors, typography } from '@static/theme'

export interface ISelectNetworkModal {
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
}

export const YourPointsModal: React.FC<ISelectNetworkModal> = ({ anchorEl, open, handleClose }) => {
  const { classes } = useStyles()

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      classes={{ paper: classes.paper }}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <Grid className={classes.root}>
        <Box className={classes.counterContainer}>
          <Box className={classes.counterItem}>
            <Typography style={{ color: colors.invariant.text, textAlign: 'center' }}>
              Points Program is{' '}
              <span
                style={{
                  color: colors.invariant.pink,
                  textAlign: 'center',
                  textShadow: `0 0 22px ${colors.invariant.pink}`
                }}>
                live on Eclipse!
              </span>
            </Typography>
            <Typography
              style={{
                color: colors.invariant.textGrey,
                ...typography.body2,
                marginTop: '8px',
                textAlign: 'center'
              }}>
              Visit Invariant Eclipse to check it.
            </Typography>
            <Button
              style={{ marginTop: '16px' }}
              className={classes.button}
              onClick={() => {
                handleClose()
                window.open('https://eclipse.invariant.app/points', '_blank')
              }}>
              Invariant Eclipse Points
            </Button>
          </Box>
        </Box>
      </Grid>
    </Popover>
  )
}

export default YourPointsModal
