import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { ISelectNetwork } from '@components/Modals/SelectNetwork/SelectNetwork'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { NetworkType } from '@consts/static'
import SelectMainnetRPC from '@components/Modals/SelectMainnetRPC/SelectMainnetRPC'
import { RpcStatus } from '@reducers/solanaConnection'
import icons from '@static/icons'

export interface IProps {
  rpc: string
  networks: ISelectNetwork[]
  rpcStatus: RpcStatus
  onSelect: (networkType: NetworkType, rpcAddress: string, rpcName?: string) => void
  disabled?: boolean
}
export const SelectRPCButton: React.FC<IProps> = ({
  rpc,
  networks,
  rpcStatus,
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
        {rpcStatus === RpcStatus.IgnoredWithError && (
          <img className={classes.warningIcon} src={icons.warningIcon} alt='Warning icon' />
        )}
        RPC
      </Button>
      <SelectMainnetRPC
        networks={networks}
        open={openMainnetRpcs}
        anchorEl={anchorEl}
        onSelect={onSelect}
        handleClose={handleClose}
        activeRPC={rpc}
        rpcStatus={rpcStatus}
      />
    </>
  )
}
export default SelectRPCButton
