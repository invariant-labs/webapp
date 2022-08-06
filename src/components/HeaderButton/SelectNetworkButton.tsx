import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'
import SelectNetwork, { ISelectNetwork } from '@components/Modals/SelectNetwork/SelectNetwork'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { NetworkType } from '@consts/static'

export interface IProps {
  name: NetworkType
  networks: ISelectNetwork[]
  onSelect: (networkType: NetworkType, rpcAddress: string, rpcName?: string) => void
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
        activeNetwork={name}
      />
    </>
  )
}
export default SelectNetworkButton
