import React from 'react'
import { Typography, Popover, Grid } from '@material-ui/core'
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
}
export const SelectMainnetRPC: React.FC<ISelectMainnetRpc> = ({
  networks,
  anchorEl,
  open,
  onSelect,
  handleClose,
  activeRPC
}) => {
  const classes = useStyles()
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
      </Grid>
    </Popover>
  )
}
export default SelectMainnetRPC
