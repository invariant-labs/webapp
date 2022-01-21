import { Button, Grid, Typography, InputAdornment, InputBase } from '@material-ui/core'
import React from 'react'
import { PositionItem } from './PositionItem/PositionItem'
import useStyle from './style'
import { INoConnected, NoConnected } from '@components/NoConnected/NoConnected'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'

export interface ILiquidityItem {
  tokenXName: string
  tokenYName: string
  tokenXIcon: string
  tokenYIcon: string
  tokenXLiq: number
  tokenYLiq: number
  fee: number
  min: number
  max: number
  value: number
  id: string
}

interface IProp {
  data: ILiquidityItem[]
  onAddPositionClick: () => void
  loading?: boolean
  showNoConnected?: boolean
  noConnectedBlockerProps: INoConnected
}

export const PositionsList: React.FC<IProp> = ({
  data,
  onAddPositionClick,
  loading = false,
  showNoConnected = false,
  noConnectedBlockerProps
}) => {
  const classes = useStyle()
  return (
    <Grid className={classes.root}>
      <Grid
        className={classes.header}
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'>
        <Grid>
          <Grid className={classes.titleBar}>
            <Typography className={classes.title}>Your Liquidity Positions</Typography>
            <Typography className={classes.positionsNumber}>{data.length}</Typography>
          </Grid>
          <InputBase
            type={'text'}
            className={classes.searchBar}
            placeholder='Search position'
            endAdornment={
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Grid>
        <Button className={classes.button} variant='contained' onClick={onAddPositionClick}>
          <span className={classes.buttonText}>+ Add Position</span>
        </Button>
      </Grid>
      <Grid className={classes.list}>
        {data.length > 0 ? (
          data.map((element, index) => (
            <Link to={`/position/${element.id}`} key={index} className={classes.itemLink}>
              <PositionItem key={index} {...element} />
            </Link>
          ))
        ) : showNoConnected ? (
          <NoConnected {...noConnectedBlockerProps} />
        ) : (
          <Typography className={classes.noPositionsText}>
            {loading ? 'Loading...' : 'Currently you have no liquidity positions.'}
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}
