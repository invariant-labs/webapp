import { Grid, Popover, Typography } from '@mui/material'
import React from 'react'
import useStyles from './styles'
import { walletNames } from '@store/consts/static'
import { WalletType } from '@store/consts/types'
import { openWalletSelectorModal } from '@utils/web3/selector'
import { changeToNightlyAdapter, connectStaticWallet } from '@utils/web3/wallet'

export interface ISelectWalletModal {
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleConnect: () => void
  handleClose: () => void
}
export const SelectWalletModal: React.FC<ISelectWalletModal> = ({
  anchorEl,
  open,
  handleConnect,
  handleClose
}) => {
  const { classes } = useStyles()

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      classes={{ paper: classes.paper }}
      onClose={() => {
        handleClose()
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
        <Typography className={classes.title}>Connect wallet</Typography>
        <Typography className={classes.subTitle}>Use nightly connector:</Typography>
        <Grid
          item
          className={classes.button}
          onClick={async () => {
            handleClose()
            changeToNightlyAdapter()
            await openWalletSelectorModal()
            handleConnect()
          }}>
          {/* <img src={copyAddressIcon} className={classes.icon} alt='Copy address icon' /> */}
          <Typography className={classes.buttonName}> {walletNames[WalletType.NIGHTLY]}</Typography>
        </Grid>

        <Typography className={classes.subTitle}> Use static connectors:</Typography>
        <Grid
          item
          className={classes.button}
          onClick={async () => {
            await connectStaticWallet(WalletType.PHANTOM)
            handleConnect()
          }}>
          {/* <img src={copyAddressIcon} className={classes.icon} alt='Copy address icon' /> */}
          <Typography className={classes.buttonName}> {walletNames[WalletType.PHANTOM]}</Typography>
        </Grid>

        <Grid
          item
          className={classes.button}
          onClick={async () => {
            await connectStaticWallet(WalletType.BACKPACK)
            handleConnect()
          }}>
          {/* <img src={copyAddressIcon} className={classes.icon} alt='Copy address icon' /> */}
          <Typography className={classes.buttonName}>{walletNames[WalletType.BACKPACK]}</Typography>
        </Grid>
        <Grid
          item
          className={classes.button}
          onClick={async () => {
            await connectStaticWallet(WalletType.SOLFLARE)
            handleConnect()
          }}>
          {/* <img src={copyAddressIcon} className={classes.icon} alt='Copy address icon' /> */}
          <Typography className={classes.buttonName}>{walletNames[WalletType.SOLFLARE]}</Typography>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default SelectWalletModal
