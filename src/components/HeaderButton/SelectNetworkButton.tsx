import React, { useMemo } from 'react'
import { Button } from '@material-ui/core'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'
import SelectNetwork, { ISelectNetwork } from '@components/Modals/SelectNetwork/SelectNetwork'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { NetworkType } from '@consts/static'
import SelectMainnetRPC from '@components/Modals/SelectMainnetRPC/SelectMainnetRPC'

export interface IProps {
  name: NetworkType
  rpc: string
  networks: ISelectNetwork[]
  onSelect: (networkType: NetworkType, rpcAddress: string, rpcName?: string) => void
  disabled?: boolean
}
export const SelectNetworkButton: React.FC<IProps> = ({
  name,
  rpc,
  networks,
  onSelect,
  disabled = false
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [openNetworks, setOpenNetworks] = React.useState<boolean>(false)
  const [openMainnetRpcs, setOpenMainnetRpcs] = React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setOpenNetworks(true)
  }

  const handleClose = () => {
    unblurContent()
    setOpenNetworks(false)
    setOpenMainnetRpcs(false)
  }

  const uniqueNetworks = useMemo(() => {
    const unique: ISelectNetwork[] = []

    networks.forEach(net => {
      if (!unique.some(innerNet => innerNet.networkType === net.networkType)) {
        unique.push(net)
      }
    })

    return unique
  }, [networks])

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
        networks={uniqueNetworks}
        open={openNetworks}
        anchorEl={anchorEl}
        onSelect={(networkType, rpcAddress, rpcName) => {
          if (networkType !== NetworkType.MAINNET) {
            onSelect(networkType, rpcAddress, rpcName)
            handleClose()
          } else {
            setOpenNetworks(false)
            setOpenMainnetRpcs(true)
          }
        }}
        handleClose={handleClose}
        activeNetwork={name}
      />
      <SelectMainnetRPC
        networks={networks.filter(network => network.networkType === NetworkType.MAINNET)}
        open={openMainnetRpcs}
        anchorEl={anchorEl}
        onSelect={onSelect}
        handleClose={handleClose}
        activeRPC={rpc}
        activeNetwork={name}
      />
    </>
  )
}
export default SelectNetworkButton
