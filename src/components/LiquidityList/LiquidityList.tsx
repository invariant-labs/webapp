import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import AddIcon from '@material-ui/icons/AddOutlined'

import { LiquidityItem } from '@components/LiquidityItem/LiquidityItem'
import useStyle from './style'
import { INoConnected, NoConnected } from '@components/NoConnected/NoConnected'
import { Link } from 'react-router-dom'
interface ILiquidityItem {
  tokenXName: string
  tokenYName: string
  tokenXIcon: string
  tokenYIcon: string
  fee: number
  min: number
  max: number
  id: string
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
            ? data.map((element, index) => (
              <Link to={`/position/${element.id}`} key={index}>
                <LiquidityItem {...element} />
              </Link>
            ))
            : (
              <Typography className={classes.noPositionsText}>
                {
                  loading
                    ? 'Loading...'
                    : (
                      !showNoConnected
                        ? 'Currently you have no liquidity positions.'
                        : ''
                    )
                }
              </Typography>
            )
        }
      </Grid>
    </Grid>
  )
}
