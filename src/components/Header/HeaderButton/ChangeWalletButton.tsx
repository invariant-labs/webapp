import React from 'react'
import useStyles from './style'
import classNames from 'classnames'
import { Button, Typography } from '@mui/material'
import { blurContent, unblurContent } from '@utils/uiUtils'
import ConnectWallet from '@components/Modals/ConnectWallet/ConnectWallet'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SelectWalletModal from '@components/Modals/SelectWalletModal/SelectWalletModal'

export interface IProps {
  name: string
  onConnect: () => void
  connected: boolean
  startIcon?: JSX.Element
  onDisconnect: () => void
  hideArrow?: boolean
  className?: string
  onCopyAddress?: () => void
  onChangeWallet?: () => void
}
export const ChangeWalletButton: React.FC<IProps> = ({
  name,
  onConnect,
  connected,
  startIcon,
  hideArrow,
  onDisconnect,
  className,
  onCopyAddress = () => {},
  onChangeWallet = () => {}
}) => {
  const { classes } = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)
  const [isOpenSelectWallet, setIsOpenSelectWallet] = React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!connected) {
      setIsOpenSelectWallet(true)
      setAnchorEl(event.currentTarget)
      blurContent()
    } else {
      setAnchorEl(event.currentTarget)
      blurContent()
      setOpen(true)
    }
  }

  const handleConnect = () => {
    if (!connected) {
      onConnect()

      setIsOpenSelectWallet(false)
      unblurContent()
    } else {
      setIsOpenSelectWallet(false)
    }
  }

  const handleClose = () => {
    unblurContent()
    setOpen(false)
  }

  const handleDisconnect = () => {
    onDisconnect()
    unblurContent()
    setOpen(false)
  }

  const handleChangeWallet = () => {
    onChangeWallet()
    unblurContent()
    setOpen(false)
  }

  const handleCopyAddress = () => {
    onCopyAddress()
    unblurContent()
    setOpen(false)
  }

  return (
    <>
      <Button
        id='connect-wallet-button'
        className={classNames(
          className,
          connected ? classes.headerButtonConnected : classes.headerButtonConnect
        )}
        variant='contained'
        classes={{
          disabled: classes.disabled,
          startIcon: classes.startIcon,
          endIcon: classes.innerEndIcon
        }}
        sx={{ '& .MuiButton-label': classes.label }}
        onClick={handleClick}
        startIcon={startIcon}
        endIcon={
          connected && !hideArrow ? <ExpandMoreIcon className={classes.endIcon} /> : undefined
        }>
        <Typography className={classes.headerButtonTextEllipsis}>{name}</Typography>
      </Button>
      <SelectWalletModal
        anchorEl={anchorEl}
        handleClose={() => {
          setIsOpenSelectWallet(false)
          unblurContent()
        }}
        handleConnect={handleConnect}
        open={isOpenSelectWallet}
      />
      <ConnectWallet
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        callDisconect={handleDisconnect}
        callCopyAddress={handleCopyAddress}
        callChangeWallet={handleChangeWallet}
      />
    </>
  )
}
export default ChangeWalletButton
