import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './style'
import WrappedIDO from '@containers/Wrappedido/WrappedIDO'
import IDOLabel from '@components/IDOLabel/IDOLabel'

const IDO = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.container}>
      <Grid container className={classes.flow}>
        <WrappedIDO />
        <IDOLabel
          Sale='15:03:33'
          Grace='32:29:27'
          SOL='121 124 846'
          Estimated='218.839'
          Invariant='20 000 000'
          SolToken='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
          EstToken='https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
        />
      </Grid>
    </Grid>
  )
}

export default IDO
