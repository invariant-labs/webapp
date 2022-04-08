import { Grid } from '@material-ui/core'
import React from 'react'
import BondHeader from '../BondHeader/BondHeader'
import IBondItem from '../BondItem/BondItem'
import { useStyles } from './style'

interface IBondListInterface {
  data: Array<{
    icon: string
    secondIcon: string
    symbol: string
    secondSymbol: string
    decimals: number
    price: number
    roiPercent: string
    purchased: string
    vesting: string
  }>
}

const BondList: React.FC<IBondListInterface> = ({ data }) => {
  const classes = useStyles()

  return (
    <Grid className={classes.container}>
      <BondHeader />
      {data.map(element => (
        <IBondItem
          icon={element.icon}
          secondIcon={element.secondIcon}
          symbol={element.symbol}
          secondSymbol={element.secondSymbol}
          decimals={element.decimals}
          price={element.price}
          roiPercent={element.roiPercent}
          purchased={element.purchased}
          vesting={element.vesting}
        />
      ))}
    </Grid>
  )
}

export default BondList
