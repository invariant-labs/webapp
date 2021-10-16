import React from 'react'
import { Button, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'
import ConnectWallet from '@components/Modals/ConnectWallet/ConnectWallet'
import { WalletType } from '@web3/wallet'

export interface IProps {
  name: string
  options: WalletType[]
  onSelect: (chosen: WalletType) => void
  connected: boolean
  startIcon?: JSX.Element
  hideArrow?: boolean
  onDisconnect: () => void
}
export const ChangeWalletButton: React.FC<IProps> = ({
  name,
  options,
  onSelect,
  connected,
  startIcon,
  hideArrow,
  onDisconnect
}) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setOpen(true)
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

  return (
    <>
      <Button
        className={classes.headerButton}
        variant='contained'
        classes={{
          disabled: classes.disabled,
          startIcon: classes.startIcon,
          endIcon: classes.innerEndIcon
        }}
        onClick={handleClick}
        startIcon={startIcon}
        endIcon={
          connected && !hideArrow ? <ExpandMoreIcon className={classes.endIcon} /> : undefined
        }>
        <Typography className={classes.headerButtonTextEllipsis}>{name}</Typography>
      </Button>
      <ConnectWallet
        options={options}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        onSelect={onSelect}
        callDisconect={handleDisconnect}
        connected={connected}
      />
    </>
  )
}
export default ChangeWalletButton
