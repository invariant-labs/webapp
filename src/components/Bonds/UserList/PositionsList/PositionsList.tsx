import { Grid } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import React from 'react'
import HeaderList from '../HeaderList/HeaderList'
import IPositionsItem from '../PositionsItem/PositionsItem'
import { useStyles } from './style'

interface IPositionsListInterface {
  data: Array<{
    icon: string
    decimals: number
    value: BN
    symbol: string
    secondIcon: string
    secondValue: BN
    secondSymbol: string
    redeemable: BN
    vestPeriod: string
  }>
}

const PositionsList: React.FC<IPositionsListInterface> = ({ data }) => {
  const classes = useStyles()

  return (
    <Grid className={classes.container}>
      <HeaderList />
      {data.map(element => (
        <IPositionsItem {...element} />
      ))}
    </Grid>
  )
}

export default PositionsList
