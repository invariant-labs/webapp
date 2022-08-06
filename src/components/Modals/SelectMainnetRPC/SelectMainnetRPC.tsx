import React, { useState } from 'react'
import { Typography, Popover, Grid, Input, Button } from '@material-ui/core'
import { NetworkType } from '@consts/static'
import icons from '@static/icons'
import DotIcon from '@material-ui/icons/FiberManualRecordRounded'
import classNames from 'classnames'
import useStyles from './styles'
import { ISelectNetwork } from '../SelectNetwork/SelectNetwork'

export interface ISelectMainnetRpc {
  networks: ISelectNetwork[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  onSelect: (networkType: NetworkType, rpcAddress: string, rpcName?: string) => void
  handleClose: () => void
  activeRPC: string
  activeNetwork: NetworkType
}
export const SelectMainnetRPC: React.FC<ISelectMainnetRpc> = ({
  networks,
  anchorEl,
  open,
  onSelect,
  handleClose,
  activeRPC,
  activeNetwork
}) => {
  const classes = useStyles()

  const [address, setAddress] = useState(
    activeNetwork !== NetworkType.MAINNET || networks.some(net => net.rpc === activeRPC)
      ? ''
      : activeRPC
  )

  const isAddressValid = () => {
    const urlRegex = /^https?:\/\/[^.]+\.[^.]+/

    return urlRegex.test(address)
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      classes={{ paper: classes.paper }}
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
        <Typography className={classes.title}>Select mainnet RPC to use</Typography>
        <Grid className={classes.list} container alignContent='space-around' direction='column'>
          {networks.map(({ networkType, rpc, rpcName }) => (
            <Grid
              className={classNames(classes.listItem, rpc === activeRPC ? classes.active : null)}
              item
              key={`networks-${networkType}`}
              onClick={() => {
                onSelect(networkType, rpc, rpcName)
                handleClose()
              }}>
              <img
                className={classes.icon}
                src={icons[`${networkType}Icon`]}
                alt={`${networkType} icon`}
              />

              <Typography className={classes.name}>{rpcName}</Typography>
              <DotIcon className={classes.dotIcon} />
            </Grid>
          ))}
        </Grid>
        <Grid
          className={classes.lowerRow}
          container
          direction='row'
          justifyContent='space-between'
          wrap='nowrap'>
          <Input
            className={classes.input}
            classes={{
              input: classes.innerInput
            }}
            placeholder='Custom RPC address'
            onChange={e => setAddress(e.target.value)}
            value={address}
            disableUnderline
          />
          <Button
            className={classes.add}
            onClick={() => {
              onSelect(NetworkType.MAINNET, address, 'Custom')
              handleClose()
            }}
            disableRipple
            disabled={!isAddressValid()}>
            Set
          </Button>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default SelectMainnetRPC
