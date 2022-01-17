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
  function paginator(current_page: number, per_page_items: number) {
    let page = current_page || 1,
      per_page = per_page_items || 10,
      offset = (page - 1) * per_page,
      paginatedItems = data.slice(offset).slice(0, per_page_items),
      total_pages = Math.ceil(data.length / per_page)

    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: data.length,
      total_pages: total_pages,
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
          paginator(page, itemsPerPage).data.map((element, index) => (
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
      {paginator(page, itemsPerPage).total_pages > 1 ? (
        <PaginationList
          pages={paginator(page, itemsPerPage).total_pages}
          defaultPage={1}
          handleChangePage={handleChangePagination}
        />
      ) : null}
    </Grid>
  )
}
