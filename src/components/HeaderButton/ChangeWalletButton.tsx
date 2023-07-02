import React from 'react'
import { Button, Typography } from '@material-ui/core'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'
import ConnectWallet from '@components/Modals/ConnectWallet/ConnectWallet'
import { WalletType } from '@web3/wallet'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import classNames from 'classnames'
import { getNCSelector } from '@web3/selector'
import { useDispatch } from 'react-redux'
import { actions as walletActions } from '@reducers/solanaWallet'

export interface IProps {
  name: string
  options: WalletType[]
  onSelect: (chosen: WalletType) => void
  connected: boolean
  startIcon?: JSX.Element
  onDisconnect: () => void
  hideArrow?: boolean
  activeWallet?: WalletType
  className?: string
}
export const ChangeWalletButton: React.FC<IProps> = ({
  name,
  options,
  onSelect,
  connected,
  startIcon,
  hideArrow,
  onDisconnect,
  activeWallet,
  className
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)
  const handleClick = async () => {
    const selector = await getNCSelector((adapter) => {
      dispatch(walletActions.connect(adapter))
    })
    selector.openModal()
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
        id='connect-wallet-button'
        className={classNames(
          className,
          connected ? classes.headerButtonConnected : classes.headerButtonConnect
        )}
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
      />
    </>
  )
}
export default ChangeWalletButton
