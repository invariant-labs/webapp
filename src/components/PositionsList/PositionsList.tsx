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
  itemsPerPage: number
}

export const PositionsList: React.FC<IProp> = ({
  data,
  onAddPositionClick,
  loading = false,
  showNoConnected = false,
  noConnectedBlockerProps,
  itemsPerPage
}) => {
  const classes = useStyle()
  const [page, setPage] = useState(1)
  const handleChangePagination = (page: number): void => {
    setPage(page)
  }
  function paginator(currentPage: number) {
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
        <Typography className={classes.title}>Your Liquidity Positions</Typography>
        <Button className={classes.button} variant='contained' onClick={onAddPositionClick}>
          <Typography className={classes.buttonText}>+ Add Position</Typography>
        </Button>
      </Grid>
      <Grid className={classes.list}>
        {data.length > 0 ? (
          paginator(page).data.map((element, index) => (
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
