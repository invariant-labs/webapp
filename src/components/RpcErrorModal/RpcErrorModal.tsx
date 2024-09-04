import { Box, Button, Input, Typography } from '@material-ui/core'
import useStyles from './style'
import icons from '@static/icons'
import { useState } from 'react'

interface Props {
  rpcAddress: string
  useDefaultRpc: () => void
  useCurrentRpc: () => void
}

export const RpcErrorModal: React.FC<Props> = ({ rpcAddress, useDefaultRpc, useCurrentRpc }) => {
  const [rpc] = useState(rpcAddress)

  const classes = useStyles()

  return (
    <>
      <div className={classes.background}></div>
      <div className={classes.container}>
        <img className={classes.warningIcon} src={icons.warningIcon} alt='Warning icon' />
        <Typography className={classes.title}>RPC Connection Error</Typography>
        {/* @ts-expect-error */}
        <Box display='flex' alignItems='center' sx={{ gap: 8, marginTop: 16 }}>
          <Typography className={classes.currentRpcText}>Current RPC:</Typography>
          <Input
            className={classes.input}
            classes={{ disabled: classes.inputDisabled }}
            disabled={true}
            value={rpc}
          />
        </Box>
        {/* @ts-expect-error */}
        <Box display='flex' alignItems='center' sx={{ gap: 8 }}>
          <Button className={classes.pinkButton} onClick={useDefaultRpc}>
            Change to default RPC
          </Button>
          <Button className={classes.greenButton} onClick={useCurrentRpc}>
            Use current RPC anyway
          </Button>
        </Box>
      </div>
    </>
  )
}
