import React from 'react'
import { Typography, Popover, Grid } from '@material-ui/core'
import { NetworkType, SolanaNetworks } from '@consts/static'
import icons from '@static/icons'
import DotIcon from '@material-ui/icons/FiberManualRecordRounded'
import classNames from 'classnames'
import useStyles from './style'
export interface ISelectNetwork {
  networkType: NetworkType
  rpc: SolanaNetworks
}
export interface ISelectNetworkModal {
  networks: ISelectNetwork[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  onSelect: (networkType: NetworkType, rpcAddress: string) => void
  handleClose: () => void
  active: NetworkType
}
export const SelectNetwork: React.FC<ISelectNetworkModal> = ({
  networks,
  anchorEl,
  open,
  onSelect,
  handleClose,
  active
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
        <Typography className={classes.title}>Select a network</Typography>
        <Grid className={classes.list} container alignContent='space-around' direction='column'>
          {networks.map(({ networkType, rpc }) => (
            <Grid
              className={classNames(classes.listItem, networkType === active ? classes.active : null)}
              item
              key={`networks-${networkType}`}
              onClick={() => {
                onSelect(networkType, rpc)
                handleClose()
              }}>
              <img className={classes.icon} src={icons[`${networkType}Icon`]} alt={`${networkType} icon`} />

              <Typography className={classes.name}>{networkType}</Typography>
              <DotIcon className={classes.dotIcon} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Popover>
  )
}
export default SelectNetwork
