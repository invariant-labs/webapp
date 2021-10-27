import React from 'react'
import { Button, Typography } from '@material-ui/core'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'
import ConnectWallet from '@components/NewDesign/Modals/ConnectWallet/ConnectWallet'
import { WalletType } from '@web3/wallet'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
export interface IProps {
  name: string
  options: WalletType[]
  onSelect: (chosen: WalletType) => void
  connected: boolean
  startIcon?: JSX.Element
  onDisconnect: () => void
  hideArrow?: boolean
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
  const [activeWallet, setActiveWallet] = React.useState(WalletType.PHANTOM)
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
        className={connected ? classes.headerButtonConnected : classes.headerButtonConnect}
        variant='contained'
        classes={{
          disabled: classes.disabled,
          startIcon: classes.startIcon,
          endIcon: classes.innerEndIcon,
          label: classes.label
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
        active={activeWallet}
        setActive={setActiveWallet}
      />
    </>
  )
}
export default ChangeWalletButton
