import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import AddIcon from '@material-ui/icons/AddOutlined'

import { LiquidityItem } from '../LiquidityItem/LiquidityItem'
import useStyle from './style'
interface ILiquidityItem {
  active: boolean
  nameToSwap: string
  nameFromSwap: string
  fee: number
  min: number
  max: number
}
interface IProp {
  data: ILiquidityItem[]
  actionMin: () => void
  actionMax: () => void
}

const handleClick = () => {
  console.log('actionButton add Position')
}
export const LiquidityList: React.FC<IProp> = ({ data, actionMin, actionMax }) => {
  const classes = useStyle()
  return (
    <Grid className={classes.root}>
      <Grid className={classes.header}>
        <Typography className={classes.title}>Your Liquidity Positions</Typography>
        <Button
          className={classes.button}
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleClick}>
          Add Position
        </Button>
      </Grid>
      <Grid>
        {data.map(element => (
          <LiquidityItem data={element} actionMin={actionMin} actionMax={actionMax} />
        ))}
      </Grid>
    </Grid>
  )
}
