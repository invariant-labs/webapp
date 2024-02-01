import React from 'react'
import { Typography, Popover, Grid } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import useStyles from './style'
export interface IConnectWalletModal {
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
  callDisconect: () => void
}
export const ConnectWallet: React.FC<IConnectWalletModal> = ({
  open,
  anchorEl,
  handleClose,
  callDisconect
}) => {
  const classes = useStyles()

  return (
    <Popover
      classes={{ paper: classes.paper }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <Grid className={classes.root} container alignContent='space-around' direction='column'>
        <Grid item className={classes.listItem} onClick={callDisconect}>
          <ExitToApp className={classes.icon} />
          <Typography className={classes.name}>Disconnect</Typography>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default ConnectWallet
