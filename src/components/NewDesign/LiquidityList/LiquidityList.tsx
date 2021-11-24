import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import AddIcon from '@material-ui/icons/AddOutlined'

import { LiquidityItem } from '../LiquidityItem/LiquidityItem'
import useStyle from './style'
import { INoConnected, NoConnected } from '../NoConnected/NoConnected'
interface ILiquidityItem {
  nameToSwap: string
  nameFromSwap: string
  iconToSwap: string
  iconFromSwap: string
  fee: number
  min: number
  max: number
}
interface IProp {
  data: ILiquidityItem[]
  onAddPositionClick: () => void
  loading?: boolean
  showNoConnected?: boolean
  noConnectedBlockerProps: INoConnected
}

export const LiquidityList: React.FC<IProp> = ({ data, onAddPositionClick, loading = false, showNoConnected = false, noConnectedBlockerProps }) => {
  const classes = useStyle()
  return (
    <Grid className={classes.root}>
      <Grid className={classes.header}>
        <Typography className={classes.title}>Your Liquidity Positions</Typography>
        <Button
          className={classes.button}
          variant='contained'
          startIcon={<AddIcon />}
          onClick={onAddPositionClick}>
          <span className={classes.buttonText}>Add Position</span>
        </Button>
      </Grid>
      <Grid className={classes.list}>
        {showNoConnected && <NoConnected {...noConnectedBlockerProps} />}
        {
          data.length > 0
            ? data.map(element => (<LiquidityItem {...element} />))
            : (
              <Typography className={classes.noPositionsText}>
                {
                  loading
                    ? 'Loading...'
                    : 'Currently you have no liquidity positions.'
                }
              </Typography>
            )
        }
      </Grid>
    </Grid>
  )
}
