import React from 'react'
import { Typography, Popover, Grid } from '@material-ui/core'
import DotIcon from '@material-ui/icons/FiberManualRecordRounded'
import { ExitToApp } from '@material-ui/icons'
import { WalletType } from '@web3/wallet'
import icons from '@static/icons'
import classNames from 'classnames'
import useStyles from './style'
export interface IConnectWalletModal {
  options: WalletType[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
  callDisconect: () => void
  connected: boolean
  onSelect: (wallet: WalletType) => void
  active: WalletType
}
export const ConnectWallet: React.FC<IConnectWalletModal> = ({
  options,
  open,
  anchorEl,
  handleClose,
  callDisconect,
  connected,
  onSelect,
  active
}) => {
  const classes = useStyles()

  const names = {
    [WalletType.PHANTOM]: 'phantom',
    [WalletType.SOLLET]: 'sollet',
    [WalletType.MATH]: 'math wallet',
    [WalletType.SOLFLARE]: 'solflare'
  }

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
      <Grid className={classes.root}>
        <Typography className={classes.title}>Connect a wallet</Typography>
        <Grid className={classes.list} container alignContent='space-around' direction='column'>
          {options.map(option => (
            <Grid
              item
              key={option}
              className={classNames(classes.listItem, option === active ? classes.active : null)}
              onClick={() => {
                onSelect(option)
                handleClose()
              }}>
              <img className={classes.icon} src={icons[names[option]]} alt={`${option} icon}`} />
              <Typography className={classes.name}>{names[option]}</Typography>
              <DotIcon className={classes.dotIcon} />
            </Grid>
          ))}

          {connected ? (
            <Grid item className={classes.listItem} onClick={callDisconect}>
              <ExitToApp className={classes.icon} />
              <Typography className={classes.name}>Disconnect</Typography>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Popover>
  )
}
export default ConnectWallet
