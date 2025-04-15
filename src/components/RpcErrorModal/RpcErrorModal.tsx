import { Button, Typography } from '@mui/material'
import useStyles from './style'
import { useState } from 'react'
import icons from '@static/icons'

interface Props {
  rpcAddress: string
  useDefaultRpc: () => void
  useCurrentRpc: () => void
}

export const RpcErrorModal: React.FC<Props> = ({ rpcAddress, useDefaultRpc, useCurrentRpc }) => {
  const [rpc] = useState(rpcAddress)

  const { classes } = useStyles()

  return (
    <>
      <div className={classes.background} />
      <div className={classes.container}>
        <img className={classes.warningIcon} src={icons.warningIcon} alt='Warning icon' />
        <Typography className={classes.title}>RPC Connection Error</Typography>
        <div className={classes.textContainer}>
          <Typography className={classes.rpcText}>
            Your RPC might not be working due to one of the following reasons:
            <ul>
              <li>The RPC server is down or not responding.</li>
              <li>Your RPC subscription expired, causing the server to stop working.</li>
              <li>Your RPC plan may not support certain calls.</li>
            </ul>
          </Typography>
          <Typography className={classes.currentRpcText}>
            Current RPC: <span className={classes.currentRpc}>{rpc}</span>
          </Typography>
        </div>
        <div className={classes.buttonsContainer}>
          <Button className={classes.mainButton} onClick={useDefaultRpc}>
            Change to default RPC
          </Button>
          <Button className={classes.otherButton} onClick={useCurrentRpc}>
            Use current RPC anyway
          </Button>
        </div>
      </div>
    </>
  )
}
