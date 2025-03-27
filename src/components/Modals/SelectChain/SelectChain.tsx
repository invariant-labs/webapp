import React from 'react'
import icons from '@static/icons'
import classNames from 'classnames'
import useStyles from './style'
import { Grid, Popover, Typography } from '@mui/material'
import DotIcon from '@mui/icons-material/FiberManualRecordRounded'
import { ISelectChain } from '@store/consts/types'

export interface ISelectChainModal {
  chains: ISelectChain[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  onSelect: (chain: ISelectChain) => void
  handleClose: () => void
  activeChain: ISelectChain
}
export const SelectChain: React.FC<ISelectChainModal> = ({
  chains,
  anchorEl,
  open,
  onSelect,
  handleClose,
  activeChain
}) => {
  const { classes } = useStyles()
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
        <Typography className={classes.title}>Select a chain</Typography>
        <Grid className={classes.list} container>
          {chains.map(chain => (
            <Grid
              className={classNames(
                classes.listItem,
                chain.name === activeChain.name ? classes.active : null
              )}
              item
              key={`chain-${activeChain}`}
              onClick={() => {
                onSelect(chain)
              }}>
              <img
                className={classes.icon}
                src={icons[chain.name.replace(/\s/g, '')]}
                alt={`${chain.name} icon`}
              />
              <Typography className={classes.name}>{chain.name}</Typography>
              <DotIcon className={classes.dotIcon} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Popover>
  )
}
export default SelectChain
