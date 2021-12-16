import ConnectWallet from '@components/Modals/ConnectWallet/ConnectWallet'
import { Button, Grid, Typography } from '@material-ui/core'
import icons from '@static/icons'
import { WalletType } from '@web3/wallet'
import classNames from 'classnames'
import React from 'react'
import useStyles from './style'

export interface INoConnected {
  onConnect: (type: WalletType) => void
  onDisconnect: () => void
  descCustomText?: string
}
export const NoConnected: React.FC<INoConnected> = ({ onConnect, onDisconnect, descCustomText }) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDisconnect = () => {
    onDisconnect()
    setOpen(false)
  }

  return (
    <>
      <Grid className={classNames(classes.blur, 'noConnectedLayer')} />
      <Grid className={classNames(classes.container, 'noConnectedLayer')}>
        <Grid className={classNames(classes.root, 'noConnectedInfo')}>
          <img className={classes.img} src={icons.NoConnected} />
          <Typography className={classes.desc}>Wallet is not connected.</Typography>
          {descCustomText?.length && <Typography className={classes.desc}>{descCustomText}</Typography>}
          <Button className={classes.button} onClick={handleClick} variant='contained'>
            Connect a wallet
          </Button>
        </Grid>
      </Grid>
      <ConnectWallet
        options={[
          WalletType.PHANTOM,
          WalletType.SOLLET,
          WalletType.MATH,
          WalletType.SOLFLARE
        ]}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        onSelect={onConnect}
        callDisconect={handleDisconnect}
        connected={false}
      />
    </>
  )
}
