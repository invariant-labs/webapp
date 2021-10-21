import React from 'react'
import { Typography, Popover, Grid } from '@material-ui/core'
import { NetworkType, SolanaNetworks } from '@consts/static'
import icons from '@static/icons'
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
}
export const SelectNetwork: React.FC<ISelectNetworkModal> = ({
  networks,
  anchorEl,
  open,
  onSelect,
  handleClose
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
      <Grid className={classes.root} container alignContent='space-around' direction='column'>
        {networks.map(({ name, network }) => (
          <Grid
            item
            key={`networks-${name}`}
            className={classes.listItem}
            onClick={() => {
              onSelect(name)
              handleClose()
            }}>
            <img className={classes.icon} src={icons[name]} alt={`${name} icon}`} />
            <Typography className={classes.name}>{name}</Typography>
            <Typography className={classes.network}>{network}</Typography>
          </Grid>
        ))}
      </Grid>
    </Popover>
  )
}
export default SelectNetwork
