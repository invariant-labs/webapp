import React from 'react'

import SelectNetwork, { ISelectNetwork } from '../SelectNetwork/SelectNetwork'
import { Button } from '@material-ui/core'

import { NetworkType } from '@consts/static'
import { blurContent, unblurContent } from '@consts/uiUtils'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

import useStyles from './style'

export interface IProps {
  name: NetworkType
  networks: ISelectNetwork[]
  onSelect: (chosen: NetworkType) => void
  disabled?: boolean
}

export const SelectNetworkButton: React.FC<IProps> = ({
  name,
  networks,
  onSelect,
  disabled = false
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setOpen(true)
  }

  const handleClose = () => {
    unblurContent()
    setOpen(false)
  }

  return (
    <>
      <Button
        className={classes.headerButton}
        variant='contained'
        classes={{ disabled: classes.disabled }}
        disabled={disabled}
        endIcon={<KeyboardArrowDownIcon id='downIcon' />}
        onClick={handleClick}>
        {name}
      </Button>
      <SelectNetwork
        networks={networks}
        open={open}
        anchorEl={anchorEl}
        onSelect={onSelect}
        handleClose={handleClose}
        active={name}
      />
    </>
  )
}
export default SelectNetworkButton
