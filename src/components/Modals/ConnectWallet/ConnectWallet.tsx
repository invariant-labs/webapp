import React from 'react'
import useStyles from './style'
import { Grid, Popover, Typography } from '@mui/material'
import icons from '@static/icons'

export interface IConnectWalletModal {
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
  callDisconect: () => void
  callCopyAddress?: () => void
  callChangeWallet?: () => void
  isChangeWallet: boolean
}
export const ConnectWallet: React.FC<IConnectWalletModal> = ({
  open,
  anchorEl,
  handleClose,
  callDisconect,
  callCopyAddress = () => {},
  callChangeWallet = () => {}
}) => {
  const { classes } = useStyles()

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
      <Grid className={classes.root} container>
        <Grid item className={classes.listItem} onClick={callCopyAddress}>
          <img src={icons.copyAddressIcon} className={classes.icon} alt='Copy address icon' />
          <Typography className={classes.name}>Copy address</Typography>
        </Grid>
        <Grid item className={classes.listItem} onClick={callChangeWallet}>
          <img src={icons.walletIcon} className={classes.icon} alt='Change wallet icon' />
          <Typography className={classes.name}>Change wallet</Typography>
        </Grid>
        <Grid item className={classes.listItem} onClick={callDisconect}>
          <img src={icons.disconnectIcon} className={classes.icon} alt='Disconnect icon' />
          <Typography className={classes.name}>Disconnect</Typography>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default ConnectWallet
