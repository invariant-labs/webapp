import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { ISelectNetwork } from '@components/Modals/SelectNetwork/SelectNetwork'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { NetworkType } from '@consts/static'
import SelectMainnetRPC from '@components/Modals/SelectMainnetRPC/SelectMainnetRPC'

export interface IProps {
  rpc: string
  networks: ISelectNetwork[]
  onSelect: (networkType: NetworkType, rpcAddress: string, rpcName?: string) => void
  disabled?: boolean
}
export const SelectRPCButton: React.FC<IProps> = ({
  rpc,
  networks,
  onSelect,
  disabled = false
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [openMainnetRpcs, setOpenMainnetRpcs] = React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setOpenMainnetRpcs(true)
  }

  const handleClose = () => {
    unblurContent()
    setOpenMainnetRpcs(false)
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
        RPC
      </Button>
      <SelectMainnetRPC
        networks={networks}
        open={openMainnetRpcs}
        anchorEl={anchorEl}
        onSelect={onSelect}
        handleClose={handleClose}
        activeRPC={rpc}
      />
    </>
  )
}
export default SelectRPCButton
