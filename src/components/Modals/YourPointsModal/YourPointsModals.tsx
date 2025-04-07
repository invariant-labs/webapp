import React from 'react'
import useStyles from './style'
import { Box, Grid, Popover, Typography } from '@mui/material'
import { Button } from '@common/Button/Button'

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
            <Typography className={classes.label}>
              Points Program is <span className={classes.textLive}>live on Eclipse!</span>
            </Typography>
            <Typography className={classes.footer}>Visit Invariant Eclipse to check it.</Typography>
            <Box className={classes.linkContainer}>
              <Button
                scheme='green'
                height={32}
                onClick={() => {
                  handleClose()
                  window.open('https://eclipse.invariant.app/points', '_blank')
                }}>
                <Typography fontSize={13}>Invariant Eclipse Points</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Popover>
  )
}

export default YourPointsModal
