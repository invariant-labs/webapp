import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import AddIcon from '@material-ui/icons/AddOutlined'

import { LiquidityItem } from '../LiquidityItem/LiquidityItem'
import useStyle from './style'
interface ILiquidityItem {
  active: boolean
  name1: string
  name2: string
  fee: number
  min: number
  max: number
}
interface IProp {
  data: ILiquidityItem[]
}
export const LiquidityList: React.FC<IProp> = ({ data }) => {
  const classes = useStyle()
  return (
    <Grid className={classes.root}>
      <Grid className={classes.header}>
        <Typography className={classes.title}>Your Liquidity Positions</Typography>
        <Button className={classes.button} variant='contained' startIcon={<AddIcon />}>
          Add Position
        </Button>
      </Grid>
      <Grid>
        {data.map(element => (
          <LiquidityItem data={element} />
        ))}
      </Grid>
    </Grid>
  )
}
