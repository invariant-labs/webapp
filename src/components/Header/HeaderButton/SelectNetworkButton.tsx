import React from 'react'
import useStyles from './style'
import { blurContent, unblurContent } from '@utils/uiUtils'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import SelectNetwork from '@components/Modals/SelectNetwork/SelectNetwork'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ISelectNetwork } from '@store/consts/types'
import { NetworkType } from '@store/consts/static'
import { colors } from '@static/theme'

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
  const { classes } = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [openNetworks, setOpenNetworks] = React.useState<boolean>(false)

  const hideArrow = useMediaQuery('@media (max-width:400px)')
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setOpenNetworks(true)
  }

  const handleClose = () => {
    unblurContent()
    setOpenNetworks(false)
  }

  return (
    <>
      <Button
        className={classes.headerButton}
        variant='contained'
        classes={{ disabled: classes.disabled }}
        disabled={disabled}
        endIcon={!hideArrow ? <KeyboardArrowDownIcon id='downIcon' /> : null}
        onClick={handleClick}>
        <Box className={classes.tileWrapper}>
          <Box style={{ color: colors.invariant.text, lineHeight: '12px' }}> {name}</Box>
          <Typography className={classes.labelWrapper}>Network</Typography>
        </Box>
      </Button>
      <SelectNetwork
        networks={networks}
        open={openNetworks}
        anchorEl={anchorEl}
        onSelect={(networkType, rpcAddress, rpcName) => {
          onSelect(networkType, rpcAddress, rpcName)
          handleClose()
        }}
        handleClose={handleClose}
        activeNetwork={name}
      />
    </>
  )
}
export default SelectNetworkButton
