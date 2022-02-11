import React, { useState } from 'react'
import { Button, Grid, Typography, InputAdornment, InputBase } from '@material-ui/core'
import { INoConnected, NoConnected } from '@components/NoConnected/NoConnected'
import { PositionItem } from './PositionItem/PositionItem'
import { PaginationList } from './Pagination/Pagination'
import SearchIcon from '@material-ui/icons/Search'

import useStyle from './style'
import { useHistory } from 'react-router-dom'

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
  valueX: number
  valueY: number
  id: string
}

interface IProp {
  data: ILiquidityItem[]
  onAddPositionClick: () => void
  loading?: boolean
  showNoConnected?: boolean
  noConnectedBlockerProps: INoConnected
  itemsPerPage: number
  searchValue: string
  searchSetValue: (value: string) => void
}

export const PositionsList: React.FC<IProp> = ({
  data,
  onAddPositionClick,
  loading = false,
  showNoConnected = false,
  noConnectedBlockerProps,
  itemsPerPage,
  searchValue,
  searchSetValue
}) => {
  const classes = useStyle()
  const history = useHistory()
  const [page, setPage] = useState(1)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchSetValue(e.target.value.toLowerCase())
  }

  const handleChangePagination = (page: number): void => {
    setPage(page)
  }

  const paginator = (currentPage: number) => {
    const page = currentPage || 1
    const perPage = itemsPerPage || 10
    const offset = (page - 1) * perPage
    const paginatedItems = data.slice(offset).slice(0, itemsPerPage)
    const totalPages = Math.ceil(data.length / perPage)

    return {
      page: page,
      totalPages: totalPages,
      data: paginatedItems
    }
  }

  return (
    <Grid className={classes.root}>
      <Grid
        className={classes.header}
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'>
        <Grid className={classes.searchRoot}>
          <Grid className={classes.titleBar}>
            <Typography className={classes.title}>Your Liquidity Positions</Typography>
            <Typography className={classes.positionsNumber}>{data.length}</Typography>
          </Grid>
          <Grid className={classes.searchWrapper}>
            <InputBase
              type={'text'}
              className={classes.searchBar}
              placeholder='Search position'
              endAdornment={
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              }
              onChange={handleChangeInput}
              value={searchValue}
            />
            <Button className={classes.button} variant='contained' onClick={onAddPositionClick}>
              <span className={classes.buttonText}>+ Add Position</span>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.list}>
        {data.length > 0 ? (
          paginator(page).data.map((element, index) => (
            <Grid onClick={() => { history.push(`/position/${element.id}`) }} key={index} className={classes.itemLink}>
              <PositionItem key={index} {...element} />
            </Grid>
          ))
        ) : showNoConnected ? (
          <NoConnected {...noConnectedBlockerProps} />
        ) : (
          <Typography className={classes.noPositionsText}>
            {loading ? 'Loading...' : 'Currently you have no liquidity positions.'}
          </Typography>
        )}
      </Grid>
      {Math.ceil(data.length / itemsPerPage) > 1 ? (
        <PaginationList
          pages={paginator(page).totalPages}
          defaultPage={1}
          handleChangePage={handleChangePagination}
        />
      ) : null}
    </Grid>
  )
}
