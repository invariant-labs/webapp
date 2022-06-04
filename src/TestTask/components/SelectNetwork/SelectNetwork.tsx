import React from 'react'

import { Typography, Popover, Grid } from '@material-ui/core'

import { NetworkType, SolanaNetworks } from '@consts/static'

import DotIcon from '@material-ui/icons/FiberManualRecordRounded'
import icons from '@static/icons'

import classNames from 'classnames'
import useStyles from './style'

export interface ISelectNetwork {
  name: NetworkType
  network: SolanaNetworks
}

export interface ISelectNetworkModal {
  networks: ISelectNetwork[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  onSelect: (wallet: NetworkType) => void
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
          {networks.map(({ name }) => (
            <Grid
              className={classNames(classes.listItem, name === active ? classes.active : null)}
              item
              key={`networks-${name}`}
              onClick={() => {
                onSelect(name)
                handleClose()
              }}>
              <img className={classes.icon} src={icons[`${name}Icon`]} alt={`${name} icon`} />

              <Typography className={classes.name}>{name}</Typography>
              <DotIcon className={classes.dotIcon} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Popover>
  )
}
export default SelectNetwork
