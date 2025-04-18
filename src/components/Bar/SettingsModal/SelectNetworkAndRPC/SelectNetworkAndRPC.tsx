import { Box, Button, Input, Typography } from '@mui/material'
import { NetworkType, RECOMMENDED_RPC_ADDRESS } from '@store/consts/static'
import { useStyles } from './style'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import { ISelectNetwork } from '@store/consts/types'
import { Separator } from '@common/Separator/Separator'
import { active2Icon, netowrkIcons } from '@static/icons'

type Props = {
  rpcs: ISelectNetwork[]
  activeNetwork: NetworkType
  activeRPC: string
  onNetworkChange: (networkType: NetworkType, rpcAddress: string) => void
}

export const SelectNetworkAndRPC = ({ rpcs, activeNetwork, activeRPC, onNetworkChange }: Props) => {
  const { classes } = useStyles()

  const inputRef = useRef<HTMLInputElement>(null)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const isCustomRPC = rpcs.find(({ rpc }) => rpc === activeRPC) === undefined
  const [customAddress, setCustomAddress] = useState(isCustomRPC ? activeRPC : '')

  const isCustomAddressValid = /^(https?:\/\/|wss?:\/\/)[\w.-]+\.[a-zA-Z]{2,}(:\d+)?(\/.*)?$/.test(
    customAddress
  )

  const networks = [NetworkType.Mainnet, NetworkType.Devnet]

  return (
    <>
      <Box className={classes.container}>
        <Typography className={classes.title}>Select a network</Typography>
        <Box className={classes.networkContainer}>
          {networks.map(network => (
            <Box
              className={classNames(classes.network, {
                [classes.networkActive]: network === activeNetwork
              })}
              key={network}
              onClick={() => {
                setCustomAddress('')
                onNetworkChange(network, '')
              }}>
              <img
                src={netowrkIcons[`${network.toLowerCase()}Glow`]}
                alt={`${network} icon`}
                width={18}
              />
              <Typography className={classes.name}>{network}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Separator isHorizontal />
      <Box className={classes.container}>
        <Typography className={classes.title}>
          Select a {activeNetwork.toLowerCase()} RPC to use
        </Typography>
        <Box className={classes.networkContainer}>
          {rpcs
            .filter(({ networkType }) => networkType === activeNetwork)
            .map(({ rpc, rpcName }) => (
              <Box
                className={classNames(classes.network, {
                  [classes.networkActive]:
                    rpc === activeRPC && !isInputFocused && customAddress == ''
                })}
                key={rpc}
                onClick={() => {
                  setCustomAddress('')
                  onNetworkChange(activeNetwork, rpc)
                }}>
                <Typography className={classes.name}>{rpcName}</Typography>
                <Box className={classes.activeContainer}>
                  <Typography className={classes.recommendedText}>
                    {RECOMMENDED_RPC_ADDRESS[activeNetwork] === rpc && 'RECOMMENDED'}
                  </Typography>
                  <Box className={classes.activeIconContainer}>
                    {rpc === activeRPC && <img src={active2Icon} alt='Active icon' />}
                  </Box>
                </Box>
              </Box>
            ))}
          <Box
            className={classNames(classes.network, {
              [classes.networkActive]: isInputFocused || isCustomRPC || customAddress !== ''
            })}
            onClick={() => inputRef.current?.focus()}>
            <Typography className={classes.name}>Custom RPC</Typography>
            <Box className={classes.activeContainer}>
              <Box className={classes.activeIconContainer}>
                {isCustomRPC && customAddress !== '' && <img src={active2Icon} alt='Active icon' />}
              </Box>
            </Box>
          </Box>
          <Box className={classes.inputContainer}>
            <Input
              className={classes.input}
              placeholder='Custom RPC address'
              disableUnderline
              inputRef={inputRef}
              value={customAddress}
              onChange={e => setCustomAddress(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <Button
              className={classes.applyButton}
              disabled={!isCustomAddressValid || (isCustomRPC && customAddress === activeRPC)}
              onClick={() => onNetworkChange(activeNetwork, customAddress)}>
              {isCustomRPC && customAddress === activeRPC ? 'Applied' : 'Apply'}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
