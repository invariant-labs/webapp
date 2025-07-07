import React, { useMemo } from 'react'
import { Button, Grid, Popover, Typography, Divider, Box, useMediaQuery } from '@mui/material'
import useStyles from './styles'
import { walletNames } from '@store/consts/static'
import { WalletType } from '@store/consts/types'
import { openWalletSelectorModal } from '@utils/web3/selector'
import { changeToNightlyAdapter, connectStaticWallet } from '@utils/web3/wallet'
import {
  backpackWalletIcon,
  closeSmallIcon,
  connectWalletIcon,
  nightlyConnectIcon,
  phantomWalletIcon,
  solflareWalletIcon
} from '@static/icons'
import useIsMobile from '@store/hooks/isMobile'
import { theme } from '@static/theme'
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
  const detectedWallet = useMemo(() => {
    const backpack = (window as any)?.backpack
    const phantom = (window as any)?.phantom
    const solflare = (window as any)?.solflare

    if (backpack && !phantom && !solflare) {
      return WalletType.BACKPACK
    } else if (phantom && !backpack && !solflare) {
      return WalletType.PHANTOM
    } else if (solflare && !phantom && !backpack) {
      return WalletType.SOLFLARE
    } else {
      return null
    }
  }, [(window as any)?.phantom, (window as any).backpack, (window as any)?.solflare])

  const isMobile = useIsMobile(true)
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const { classes } = useStyles({ isMobile: isMobile && detectedWallet !== null })

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

  const handleNightlySelector = () => {
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
  }

  return (
    <Popover
      open={open}
      marginThreshold={0}
      classes={{
        root: classes.popoverRoot,
        paper: classes.paper
      }}
      anchorEl={document.body}
      onClose={handleClose}>
      <Box className={classes.root}>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems={isMobile && detectedWallet !== null ? 'center' : 'end'}
          mb={isMobile && detectedWallet !== null ? 3 : 0}>
          {(!isMobile || detectedWallet === null) && <Box width={16} />}
          <Typography className={classes.title}>Connect your wallet</Typography>

          <Grid
            className={classes.topCloseButton}
            onClick={() => {
              setIsOpenSelectWallet(false)
            }}>
            <img width={16} src={closeSmallIcon} alt='Close'></img>
          </Grid>
        </Box>
        {detectedWallet && isMobile ? (
          <>
            <Typography className={classes.mobileSubtitle}>
              Connect your wallet to interact with Invariant!
            </Typography>
            <Box
              className={classes.mobileWallet}
              onClick={async () => handleConnectStaticWallet(detectedWallet)}>
              <img src={connectWalletIcon} alt='Connect wallet' />
              <Typography>Connect</Typography>
            </Box>
          </>
        ) : (
          <>
            <Grid className={classes.buttonWrapper}>
              <Typography className={classes.subTitle}>
                Connect using Nightly's auto-detection
              </Typography>
              <Grid className={classes.buttonList}>
                <Grid
                  item
                  className={classes.button}
                  onClick={() => {
                    handleNightlySelector()
                  }}>
                  <Typography className={classes.buttonName}>
                    <img
                      width={53}
                      rel='preload'
                      src={nightlyConnectIcon}
                      alt='nightly connect logo'></img>
                    {walletNames[WalletType.NIGHTLY]}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid className={classes.buttonWrapper}>
              <Typography className={classes.subTitle}>Or connect with popular wallets</Typography>
              <Grid className={classes.buttonList}>
                <Grid
                  item
                  className={classes.button}
                  onClick={async () => {
                    handleConnectStaticWallet(WalletType.PHANTOM)
                  }}>
                  <Grid className={classes.buttonContainer}>
                    <Typography className={classes.buttonName}>
                      <img
                        style={isSm ? { margin: 0 } : {}}
                        width={45}
                        rel='preload'
                        src={phantomWalletIcon}
                        alt='backpack wallet icon'></img>

                      {!isSm && walletNames[WalletType.PHANTOM]}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  className={classes.button}
                  onClick={async () => {
                    handleConnectStaticWallet(WalletType.BACKPACK)
                  }}>
                  <Grid className={classes.buttonContainer}>
                    <Typography className={classes.buttonName}>
                      <img
                        style={isSm ? { margin: 0 } : {}}
                        width={45}
                        rel='preload'
                        src={backpackWalletIcon}
                        alt='nightly wallet icon'></img>

                      {!isSm && walletNames[WalletType.BACKPACK]}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  className={classes.button}
                  onClick={async () => {
                    handleConnectStaticWallet(WalletType.SOLFLARE)
                  }}>
                  <Grid className={classes.buttonContainer}>
                    <Typography className={classes.buttonName}>
                      <img
                        style={isSm ? { margin: 0 } : {}}
                        width={45}
                        rel='preload'
                        src={solflareWalletIcon}
                        alt='Close'></img>
                      {!isSm && walletNames[WalletType.SOLFLARE]}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid className={classes.modalFooter}>
              <Typography className={classes.footerTitle}>Don't have a wallet?</Typography>
              <a href={' https://nightly.app/'} target='_blank'>
                <Button className={classes.buttonPrimary} variant='contained'>
                  Download one!
                </Button>
              </a>
            </Grid>
          </>
        )}
      </Box>
    </Popover>
  )
}

export default SelectWalletModal
