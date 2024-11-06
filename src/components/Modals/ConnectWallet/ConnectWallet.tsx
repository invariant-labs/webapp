import React from 'react'
import useStyles from './style'
import { Grid, Popover, Typography } from '@mui/material'
import copyAddressIcon from '@static/svg/copy-address.svg'
import walletIcon from '@static/svg/wallet.svg'
import disconnectIcon from '@static/svg/disconnect.svg'
export interface IConnectWalletModal {
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
  callDisconect: () => void
  callCopyAddress?: () => void
  callChangeWallet?: () => void
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
      <Grid className={classes.root} container alignContent='space-around' direction='column'>
        <Grid item className={classes.listItem} onClick={callCopyAddress}>
          <img src={copyAddressIcon} className={classes.icon} alt='Copy address icon' />
          <Typography className={classes.name}>Copy address</Typography>
        </Grid>
        <Grid item className={classes.listItem} onClick={callChangeWallet}>
          <img src={walletIcon} className={classes.icon} alt='Change wallet icon' />
          <Typography className={classes.name}>Change wallet</Typography>
        </Grid>
        <Grid item className={classes.listItem} onClick={callDisconect}>
          <img src={disconnectIcon} className={classes.icon} alt='Disconnect icon' />
          <Typography className={classes.name}>Disconnect</Typography>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default ConnectWallet
