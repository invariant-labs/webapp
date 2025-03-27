import React, { useEffect, useRef, useState } from 'react'
import icons from '@static/icons'
import DotIcon from '@mui/icons-material/FiberManualRecordRounded'
import classNames from 'classnames'
import useStyles from './styles'
import { ISelectNetwork } from '@store/consts/types'
import { NetworkType, RECOMMENDED_RPC_ADDRESS } from '@store/consts/static'
import { Box, Button, Grid, Input, Popover, Typography } from '@mui/material'
import { RpcStatus } from '@store/reducers/solanaConnection'

export interface ISelectDevnetRpc {
  networks: ISelectNetwork[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  onSelect: (networkType: NetworkType, rpcAddress: string, rpcName?: string) => void
  handleClose: () => void
  activeRPC: string
  rpcStatus: RpcStatus
}
export const SelectDevnetRPC: React.FC<ISelectDevnetRpc> = ({
  networks,
  anchorEl,
  open,
  onSelect,
  handleClose,
  activeRPC,
  rpcStatus
}) => {
  const { classes } = useStyles()

  const [activeCustom, setActiveCustom] = useState(false)
  const [customApplied, setCustomApplied] = useState(false)
  const [buttonApplied, setButtonApplied] = useState(false)
  const [address, setAddress] = useState(
    networks.some(net => net.rpc === activeRPC) ? '' : activeRPC
  )
  const inputRef = useRef<HTMLInputElement>(null)

  const isAddressValid = () => {
    const urlRegex = /^(https?:\/\/|wss?:\/\/)[\w.-]+\.[a-zA-Z]{2,}(:\d+)?(\/.*)?$/
    return urlRegex.test(address)
  }

  useEffect(() => {
    if (!open && !customApplied) {
      setAddress('')
    }
  }, [open])

  useEffect(() => {
    if (!networks.some(net => net.rpc === activeRPC)) {
      setCustomApplied(true)
      setButtonApplied(true)
      setActiveCustom(true)
      setAddress(activeRPC)
    } else {
      setCustomApplied(false)
      setButtonApplied(false)
      setActiveCustom(false)
      setAddress('')
    }
  }, [activeRPC])

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      classes={{ paper: classes.paper }}
      onClose={() => {
        handleClose()
        !buttonApplied && setActiveCustom(false)
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <Grid className={classes.root}>
        <Typography className={classes.title}>Select devnet RPC to use</Typography>
        {rpcStatus === RpcStatus.IgnoredWithError &&
          activeRPC !== RECOMMENDED_RPC_ADDRESS[NetworkType.Devnet] && (
            <div className={classes.warningContainer}>
              <img className={classes.warningIcon} src={icons.warningIcon} alt='Warning icon' />
              <Typography className={classes.warningText}>
                Current RPC might not work properly
              </Typography>
            </div>
          )}
        <Grid className={classes.list} container>
          {networks.map(({ networkType, rpc, rpcName }) => (
            <Grid
              className={classNames(
                classes.listItem,
                rpc === activeRPC && !customApplied ? classes.active : null,
                !activeCustom && rpc === activeRPC ? classes.activeBackground : null
              )}
              item
              key={`networks-${networkType}-${rpc}`}
              onClick={() => {
                onSelect(networkType, rpc, rpcName)
                setActiveCustom(false)
                setCustomApplied(false)
                setButtonApplied(false)
                handleClose()
              }}>
              <Box className={classes.labelWrapper}>
                <Typography className={classes.name}>{rpcName} </Typography>
                <Typography className={classes.recommendedText}>
                  {RECOMMENDED_RPC_ADDRESS[NetworkType.Devnet] === rpc && 'RECOMMENDED'}
                </Typography>
              </Box>
              <DotIcon className={classes.dotIcon} />
            </Grid>
          ))}
          <Grid
            className={classNames(
              classes.listItem,
              activeCustom && customApplied ? classes.active : null,
              activeCustom ? classes.activeBackground : null
            )}
            item
            key={`custom-rpc`}
            onClick={() => {
              setActiveCustom(true)
              inputRef.current?.focus()
            }}>
            <Box className={classes.labelWrapper}>
              <Typography className={classes.name}>Custom RPC</Typography>
            </Box>
            <DotIcon className={classes.dotIcon} />
          </Grid>
        </Grid>
        <Grid className={classes.lowerRow} container>
          <Input
            className={classNames(classes.input, activeCustom ? classes.activePlaceholder : null)}
            classes={{
              input: classes.innerInput
            }}
            placeholder='Custom RPC address'
            onChange={e => {
              setButtonApplied(false)
              setAddress(e.target.value)
            }}
            onClick={() => setActiveCustom(true)}
            value={address}
            disableUnderline
            inputRef={inputRef}
          />
          <Button
            className={classNames(classes.add, buttonApplied ? classes.applied : null)}
            onClick={() => {
              onSelect(NetworkType.Devnet, address, 'Custom')
              setCustomApplied(true)
              setButtonApplied(true)
              handleClose()
            }}
            disableRipple
            disabled={!isAddressValid()}
            style={{ opacity: !activeCustom ? '0.5' : '1' }}>
            {buttonApplied ? 'Applied' : 'Apply'}
          </Button>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default SelectDevnetRPC
