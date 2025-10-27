import React from 'react'
import useStyles from './style'
import { Button, Grid, Popover, Typography } from '@mui/material'

export interface IPositionViewActionPopover {
  open: boolean
  anchorEl: HTMLButtonElement | null
  unclaimedFeesInUSD: { value: number; loading: boolean; isClaimAvailable: boolean }
  closePosition: () => void
  claimFee: () => void
  handleClose: () => void
  createPosition: () => void
  shouldDisable: boolean
  openPoolDetails: () => void
}

export const PositionViewActionPopover: React.FC<IPositionViewActionPopover> = ({
  anchorEl,
  open,
  handleClose,
  claimFee,
  closePosition,
  createPosition,
  unclaimedFeesInUSD,
  shouldDisable,
  openPoolDetails
}) => {
  const { classes, cx } = useStyles()

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
          <Button className={cx(classes.listItem)} onClick={createPosition}>
            <Typography className={classes.name}>Create position</Typography>
          </Button>
          <Button
            disabled={!unclaimedFeesInUSD.isClaimAvailable || shouldDisable}
            className={cx(classes.listItem)}
            onClick={() => {
              claimFee()
              handleClose()
            }}>
            <Typography className={classes.name}>Claim fee</Typography>
          </Button>
          <Button
            className={cx(classes.listItem)}
            disabled={shouldDisable}
            onClick={() => {
              closePosition()
              handleClose()
            }}>
            <Typography className={classes.name}>Close position</Typography>
          </Button>
          <Button className={cx(classes.listItem)} onClick={openPoolDetails}>
            <Typography className={classes.name}>Pool details</Typography>
          </Button>
        </Grid>
      </Grid>
    </Popover>
  )
}

export default PositionViewActionPopover
