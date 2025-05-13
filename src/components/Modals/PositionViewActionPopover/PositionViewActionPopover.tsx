import React from 'react'
import classNames from 'classnames'
import useStyles from './style'
import { Button, Grid, Popover, Typography } from '@mui/material'

export interface IPositionViewActionPopover {
  open: boolean
  anchorEl: HTMLButtonElement | null
  unclaimedFeesInUSD: number
  closePosition: () => void
  claimFee: () => void
  handleClose: () => void
  shouldDisable: boolean
}

export const PositionViewActionPopover: React.FC<IPositionViewActionPopover> = ({
  anchorEl,
  open,
  handleClose,
  claimFee,
  closePosition,
  unclaimedFeesInUSD,
  shouldDisable
}) => {
  const { classes } = useStyles()

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      classes={{ paper: classes.paper }}
      onClose={handleClose}
      slotProps={{
        root: {
          onClick: e => e.stopPropagation()
        }
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <Grid className={classes.root}>
        <Grid className={classes.list} container>
          <Button
            disabled={unclaimedFeesInUSD <= 0 || shouldDisable}
            className={classNames(classes.listItem)}
            onClick={() => {
              claimFee()
              handleClose()
            }}>
            <Typography className={classes.name}>Claim fee</Typography>
          </Button>
          <Button
            className={classNames(classes.listItem)}
            // disabled={isLocked}
            disabled={shouldDisable}
            onClick={() => {
              closePosition()
              handleClose()
            }}>
            <Typography className={classes.name}>Close position</Typography>
          </Button>
        </Grid>
        {/* <Button
          className={classNames(classes.listItem)}
          disabled={isLocked}
          onClick={() => {
            onLockPosition()
            handleClose()
          }}>
          <Typography className={classes.name}>Lock position</Typography>
        </Button> */}
      </Grid>
    </Popover>
  )
}

export default PositionViewActionPopover
