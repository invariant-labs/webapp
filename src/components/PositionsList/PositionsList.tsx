import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Grid, Typography, InputAdornment, InputBase } from '@material-ui/core'
import { INoConnected, NoConnected } from '@components/NoConnected/NoConnected'
import { ILiquidityItem, PositionItem } from './PositionItem/PositionItem'
import { PaginationList } from '@components/Pagination/Pagination'
import SearchIcon from '@static/svg/lupaDark.svg'
import loader from '@static/gif/loader.gif'
import useStyle from './style'
import EmptyPlaceholder from '@components/EmptyPlaceholder/EmptyPlaceholder'

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

  useEffect(() => {
    setPage(1)
  }, [searchValue])

  return (
    <Grid container direction='column' className={classes.root}>
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
                  <img src={SearchIcon} className={classes.searchIcon} />
                </InputAdornment>
              }
              onChange={handleChangeInput}
              value={searchValue}
            />
            <Button
              className={showNoConnected ? classes.buttonSelectDisabled : classes.button}
              variant='contained'
              onClick={showNoConnected ? () => {} : onAddPositionClick}>
              <span className={classes.buttonText}>+ Add Position</span>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction='column' className={classes.list} justifyContent='flex-start'>
        {data.length > 0 ? (
          paginator(page).data.map((element, index) => (
            <Grid
              onClick={() => {
                history.push(`/position/${element.id}`)
              }}
              key={index}
              className={classes.itemLink}>
              <PositionItem key={index} {...element} />
            </Grid>
          ))
        ) : showNoConnected ? (
          <NoConnected {...noConnectedBlockerProps} />
        ) : loading ? (
          <Grid container>
            <img src={loader} className={classes.loading} />
          </Grid>
        ) : (
          <EmptyPlaceholder
            desc='Add your first position by pressing the button and start earning!'
            className={classes.placeholder}
          />
        )}
      </Grid>
      {paginator(page).totalPages > 1 ? (
        <PaginationList
          pages={paginator(page).totalPages}
          defaultPage={1}
          handleChangePage={handleChangePagination}
          variant='end'
        />
      ) : null}
    </Grid>
  )
}
