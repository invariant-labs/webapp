import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import { SaleDetails, ISaleDetails } from './SaleDetails/SaleDetails'
import { DepositCard, IDepositCard } from './DepositCard/DepositCard'

export interface IIDOProps {
  saleDetails: ISaleDetails
  depositDetails: IDepositCard
}

export const IDO: React.FC<IIDOProps> = ({ saleDetails, depositDetails }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.wrapper} direction='column'>
      <Typography className={classes.title}>IDO</Typography>
      <Grid container className={classes.row}>
        <DepositCard {...depositDetails} className={classes.deposit} />
        <SaleDetails {...saleDetails} />
      </Grid>
    </Grid>
  )
}
