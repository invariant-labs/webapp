import React from 'react'
import useStyles from './style'
import { Grid, Typography } from '@material-ui/core'
import SaleDetails, { ISaleDetails } from './SaleDetails/SaleDetails'
import DepositCard, { IDepositCard } from './DepositCard/DepositCard'

export interface IIDOProps {
  saleDetails: ISaleDetails
  depositDetails: IDepositCard
  walletConnected?: boolean
  onWalletConnect?: () => void
}

const IDO: React.FC<IIDOProps> = ({
  saleDetails,
  depositDetails,
  walletConnected,
  onWalletConnect
}) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.wrapper} direction='column'>
      <Typography className={classes.title}>IDO</Typography>
      <Grid container className={classes.row}>
        <DepositCard
          {...depositDetails}
          className={classes.deposit}
          walletConnected={walletConnected}
          onWalletConnect={onWalletConnect}
        />
        <SaleDetails {...saleDetails} />
      </Grid>
    </Grid>
  )
}

export default IDO
