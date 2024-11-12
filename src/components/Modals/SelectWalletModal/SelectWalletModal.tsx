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
  isChangeWallet: boolean
  onDisconnect: () => void
}
export const SelectWalletModal: React.FC<ISelectWalletModal> = ({
  anchorEl,
  open,
  handleConnect,
  handleClose,
  isChangeWallet,
  onDisconnect
}) => {
  const { classes } = useStyles()

  const setWallet = (wallet: WalletType) => {
    localStorage.setItem('WALLET_TYPE', wallet.toString())
  }

  const handleConnectStaticWallet = async (wallet: WalletType) => {
    if (isChangeWallet) {
      await (async () => onDisconnect())()
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    await connectStaticWallet(wallet)
    handleConnect()
    setWallet(wallet)
  }

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
            if (isChangeWallet) {
              await (async () => onDisconnect())()
              await new Promise(resolve => setTimeout(resolve, 100))
            }
            changeToNightlyAdapter()
            await openWalletSelectorModal()
            handleConnect()
            setWallet(WalletType.NIGHTLY)
          }}>
          {/* <img src={copyAddressIcon} className={classes.icon} alt='Copy address icon' /> */}
          <Typography className={classes.buttonName}> {walletNames[WalletType.NIGHTLY]}</Typography>
        </Grid>

        <Typography className={classes.subTitle}> Use static connectors:</Typography>
        <Grid
          item
          className={classes.button}
          onClick={() => {
            handleConnectStaticWallet(WalletType.PHANTOM)
          }}>
          {/* <img src={copyAddressIcon} className={classes.icon} alt='Copy address icon' /> */}
          <Typography className={classes.buttonName}> {walletNames[WalletType.PHANTOM]}</Typography>
        </Grid>

        <Grid
          item
          className={classes.button}
          onClick={async () => {
            handleConnectStaticWallet(WalletType.BACKPACK)
          }}>
          {/* <img src={copyAddressIcon} className={classes.icon} alt='Copy address icon' /> */}
          <Typography className={classes.buttonName}>{walletNames[WalletType.BACKPACK]}</Typography>
        </Grid>
        <Grid
          item
          className={classes.button}
          onClick={async () => {
            handleConnectStaticWallet(WalletType.SOLFLARE)
          }}>
          {/* <img src={copyAddressIcon} className={classes.icon} alt='Copy address icon' /> */}
          <Typography className={classes.buttonName}>{walletNames[WalletType.SOLFLARE]}</Typography>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default SelectWalletModal
