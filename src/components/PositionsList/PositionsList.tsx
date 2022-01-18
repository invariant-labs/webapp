import { Button, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { PositionItem } from './PositionItem/PositionItem'
import useStyle from './style'
import { INoConnected, NoConnected } from '@components/NoConnected/NoConnected'
import { Link } from 'react-router-dom'
import { PaginationList } from './Pagination/Pagination'

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
  const [page, setPage] = useState(1)
  const itemsPerPage = 6
  const handleChangePagination = (page: number): void => {
    setPage(page)
  }
  function paginator(data: ILiquidityItem[], currentPage: number, perPageItems: number) {
    const page = currentPage || 1
    const perPage = perPageItems || 10
    const offset = (page - 1) * perPage
    const paginatedItems = data.slice(offset).slice(0, perPageItems)
    const totalPages = Math.ceil(data.length / perPage)

    return {
      page: page,
      perPage: perPage,
      prePage: page - 1 ? page - 1 : null,
      nextPage: totalPages > page ? page + 1 : null,
      total: data.length,
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
        <Typography className={classes.title}>Your Liquidity Positions</Typography>
        <Button className={classes.button} variant='contained' onClick={onAddPositionClick}>
          <span className={classes.buttonText}>+ Add Position</span>
        </Button>
      </Grid>
      <Grid className={classes.list}>
        {data.length > 0 ? (
          paginator(data, page, itemsPerPage).data.map((element, index) => (
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
      {paginator(data, page, itemsPerPage).totalPages > 1 ? (
        <PaginationList
          pages={paginator(data, page, itemsPerPage).totalPages}
          defaultPage={1}
          handleChangePage={handleChangePagination}
        />
      ) : null}
    </Grid>
  )
}
