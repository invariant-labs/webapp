import React from 'react'
import useStyles from './style'
import { blurContent, unblurContent } from '@utils/uiUtils'
import { Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SelectMainnetRPC from '@components/Modals/SelectMainnetRPC/SelectMainnetRPC'
import { NetworkType, RECOMMENDED_RPC_ADDRESS } from '@store/consts/static'
import icons from '@static/icons'
import { ISelectNetwork } from '@store/consts/types'
import { RpcStatus } from '@store/reducers/solanaConnection'
import SelectDevnetRPC from '@components/Modals/SelectDevnetRPC/SelectDevnetRPC'

export interface IProps {
  rpc: string
  networks: ISelectNetwork[]
  onSelect: (networkType: NetworkType, rpcAddress: string, rpcName?: string) => void
  disabled?: boolean
  network: NetworkType
  rpcStatus: RpcStatus
}
export const SelectRPCButton: React.FC<IProps> = ({
  rpc,
  networks,
  onSelect,
  disabled = false,
  network,
  rpcStatus
}) => {
  const { classes } = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [openRpcsModal, setOpenRpcsModal] = React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setOpenRpcsModal(true)
  }

  const handleClose = () => {
    unblurContent()
    setOpenRpcsModal(false)
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
        {rpcStatus === RpcStatus.IgnoredWithError && rpc !== RECOMMENDED_RPC_ADDRESS[network] && (
          <img className={classes.warningIcon} src={icons.warningIcon} alt='Warning icon' />
        )}
        RPC
      </Button>
      {network === NetworkType.Devnet ? (
        <SelectDevnetRPC
          networks={networks}
          open={openRpcsModal}
          anchorEl={anchorEl}
          onSelect={onSelect}
          handleClose={handleClose}
          activeRPC={rpc}
          rpcStatus={rpcStatus}
        />
      ) : (
        <SelectMainnetRPC
          networks={networks}
          open={openRpcsModal}
          anchorEl={anchorEl}
          onSelect={onSelect}
          handleClose={handleClose}
          activeRPC={rpc}
          rpcStatus={rpcStatus}
        />
      )}
    </>
  )
}
export default SelectRPCButton
