import React from 'react'
import { Typography, Popover, Grid } from '@material-ui/core'
import { NetworkType } from '@consts/static'
import icons from '@static/icons'
import DotIcon from '@material-ui/icons/FiberManualRecordRounded'
import classNames from 'classnames'
import useStyles from './style'
export interface ISelectNetwork {
  networkType: NetworkType
  rpc: string
  rpcName?: string
}
export interface ISelectNetworkModal {
  networks: ISelectNetwork[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  onSelect: (networkType: NetworkType, rpcAddress: string, rpcName?: string) => void
  handleClose: () => void
  activeNetwork: NetworkType
}
export const SelectNetwork: React.FC<ISelectNetworkModal> = ({
  networks,
  anchorEl,
  open,
  onSelect,
  handleClose,
  activeNetwork
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
          {networks.map(({ networkType, rpc, rpcName }) => (
            <Grid
              className={classNames(
                classes.listItem,
                networkType === activeNetwork ? classes.active : null
              )}
              item
              key={`networks-${networkType}`}
              onClick={() => {
                onSelect(networkType, rpc, rpcName)
              }}>
              <img
                className={classes.icon}
                src={icons[`${networkType}Icon`]}
                alt={`${networkType} icon`}
              />

              <Typography className={classes.name}>{networkType}</Typography>
              <DotIcon className={classes.dotIcon} />
            </Grid>
          ))}
          <a href='https://eclipse.invariant.app' style={{ textDecoration: 'none' }}>
            <Grid className={classes.listItem} item key='networks-eclipse'>
              <img className={classes.icon} src={icons.TestnetIcon} alt='testnet'/>
              <Typography className={classes.name}>Eclipse</Typography>
            </Grid>
          </a>
          <a href='https://azero.invariant.app' style={{ textDecoration: 'none' }}>
            <Grid className={classes.listItem} item key='networks-aleph-zero'>
              <img className={classes.icon} src={icons.TestnetIcon} alt='testnet'/>
              <Typography className={classes.name}>Aleph Zero</Typography>
            </Grid>
          </a>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default SelectNetwork
