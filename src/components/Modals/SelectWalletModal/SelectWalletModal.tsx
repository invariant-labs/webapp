import React from 'react'
import { Button, Grid, Popover, Typography, Divider, Box } from '@mui/material'
import useStyles from './styles'
import { walletNames } from '@store/consts/static'
import { WalletType } from '@store/consts/types'
import { openWalletSelectorModal } from '@utils/web3/selector'
import { changeToNightlyAdapter, connectStaticWallet } from '@utils/web3/wallet'
import icons from '@static/icons'
export interface ISelectWalletModal {
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleConnect: () => void
  handleClose: () => void
  isChangeWallet: boolean
  onDisconnect: () => void
  setIsOpenSelectWallet: (isOpen: boolean) => void
}

export const SelectWalletModal: React.FC<ISelectWalletModal> = ({
  open,
  handleConnect,
  handleClose,
  isChangeWallet,
  setIsOpenSelectWallet,
  onDisconnect
}) => {
  const { classes } = useStyles()

  const setWallet = (wallet: WalletType) => {
    localStorage.setItem('WALLET_TYPE', wallet.toString())
  }

  const handleConnectStaticWallet = async (wallet: WalletType) => {
    setIsOpenSelectWallet(false)
    setTimeout(async () => {
      if (isChangeWallet) {
        await (async () => onDisconnect())()
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      await connectStaticWallet(wallet)
      handleConnect()
      setWallet(wallet)
    }, 300)
  }

  return (
    <div className={classes.modalContainer}>
      <Popover
        open={open}
        anchorReference='none'
        classes={{
          root: classes.popoverRoot,
          paper: classes.paper
        }}
        onClose={handleClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Box className={classes.root}>
          <Grid
            className={classes.topCloseButton}
            onClick={() => {
              setIsOpenSelectWallet(false)
            }}>
            <img width={16} src={icons.closeIcon} alt='Close'></img>
          </Grid>
          <Typography className={classes.title}>Connect your wallet</Typography>

          <Grid className={classes.buttonWrapper}>
            <Typography className={classes.subTitle}>Connect with popular wallets </Typography>
            <Grid className={classes.buttonList}>
              <Grid
                item
                className={classes.button}
                onClick={() => {
                  handleConnectStaticWallet(WalletType.PHANTOM)
                }}>
                <Typography className={classes.buttonName}>
                  {' '}
                  <img width={45} src={icons.PhantomWallet} alt='Close'></img>
                  {walletNames[WalletType.PHANTOM]}
                </Typography>
              </Grid>
              <Grid
                item
                className={classes.button}
                onClick={async () => {
                  handleConnectStaticWallet(WalletType.BACKPACK)
                }}>
                <Typography className={classes.buttonName}>
                  <img width={40} src={icons.BackpackWallet} alt='Close'></img>

                  {walletNames[WalletType.BACKPACK]}
                </Typography>
              </Grid>
              <Grid
                item
                className={classes.button}
                onClick={async () => {
                  handleConnectStaticWallet(WalletType.SOLFLARE)
                }}>
                <Typography className={classes.buttonName}>
                  <img width={45} src={icons.SolflareWallet} alt='Close'></img>

                  {walletNames[WalletType.SOLFLARE]}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Divider className={classes.divider} />

          <Grid className={classes.buttonWrapper}>
            <Typography className={classes.subTitle}>
              Or connect any wallet using auto-detection with Nightly wallet selector Nightly
            </Typography>
            <Grid className={classes.buttonList}>
              <Grid
                item
                className={classes.button}
                onClick={() => {
                  setIsOpenSelectWallet(false)
                  setTimeout(async () => {
                    if (isChangeWallet) {
                      await (async () => onDisconnect())()
                      await new Promise(resolve => setTimeout(resolve, 100))
                    }
                    changeToNightlyAdapter()
                    await openWalletSelectorModal()
                    handleConnect()
                    setWallet(WalletType.NIGHTLY)
                  }, 300)
                }}>
                <Typography className={classes.buttonName}>
                  {' '}
                  <img width={35} src={icons.NightlyConnect} alt='Close'></img>
                  {walletNames[WalletType.NIGHTLY]}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Divider className={classes.divider} />

          <Grid className={classes.modalFooter}>
            <Typography className={classes.footerTitle}>Don't have a wallet?</Typography>
            <a href={' https://nightly.app/'} target='_blank'>
              <Button className={classes.buttonPrimary} variant='contained'>
                Download now!
              </Button>
            </a>
          </Grid>
        </Box>
      </Popover>
    </div>
  )
}

export default SelectWalletModal
