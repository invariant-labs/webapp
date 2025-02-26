import { EmptyPlaceholder } from '@components/EmptyPlaceholder/EmptyPlaceholder'
import { INoConnected, NoConnected } from '@components/NoConnected/NoConnected'
import { Button, Grid, Typography } from '@mui/material'
import loader from '@static/gif/loader.gif'
import refreshIcon from '@static/svg/refresh.svg'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPositionItem, PositionItem } from './PositionItem/PositionItem'
import { useStyles } from './style'
import { PaginationList } from '@components/Pagination/Pagination'
import { TooltipHover } from '@components/TooltipHover/TooltipHover'
import { FilterSearch, ISearchToken } from '@components/FilterSearch/FilterSearch'
import { NetworkType } from '@store/consts/static'

interface IProps {
  initialPage: number
  setLastPage: (page: number) => void
  data: IPositionItem[]
  onAddPositionClick: () => void
  loading?: boolean
  showNoConnected?: boolean
  noConnectedBlockerProps: INoConnected
  itemsPerPage: number
  handleRefresh: () => void
  // pageChanged: (page: number) => void
  // loadedPages: Record<number, boolean>
  // getRemainingPositions: () => void
  noInitialPositions: boolean
  currentNetwork: NetworkType
}

export const PositionsList: React.FC<IProps> = ({
  initialPage,
  setLastPage,
  data,
  onAddPositionClick,
  loading = false,
  showNoConnected = false,
  noConnectedBlockerProps,
  itemsPerPage,
  handleRefresh,
  currentNetwork,
  // pageChanged,
  // loadedPages,
  // getRemainingPositions,
  noInitialPositions
}) => {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const [defaultPage] = useState(initialPage)
  const [page, setPage] = useState(initialPage)
  const [selectedFilters, setSelectedFilters] = useState<ISearchToken[]>([])

  const filteredData = useMemo(() => {
    if (selectedFilters.length === 0) return data

    return data.filter(position => {
      const tokenX = position.tokenXName.toLowerCase()
      const tokenY = position.tokenYName.toLowerCase()

      if (selectedFilters.length === 1) {
        const filterToken = selectedFilters[0].symbol.toLowerCase()
        return tokenX === filterToken || tokenY === filterToken
      }

      if (selectedFilters.length === 2) {
        const filterToken1 = selectedFilters[0].symbol.toLowerCase()
        const filterToken2 = selectedFilters[1].symbol.toLowerCase()
        return (
          (tokenX === filterToken1 && tokenY === filterToken2) ||
          (tokenX === filterToken2 && tokenY === filterToken1)
        )
      }

      return true
    })
  }, [data, selectedFilters])

  const handleChangePagination = (page: number): void => {
    setLastPage(page)
    setPage(page)
  }

  const paginator = (currentPage: number) => {
    const page = currentPage || 1
    const perPage = itemsPerPage || 10
    const offset = (page - 1) * perPage
    const paginatedItems = filteredData.slice(offset).slice(0, itemsPerPage)
    const totalPages = Math.ceil(filteredData.length / perPage)

    return {
      page: page,
      totalPages: totalPages,
      data: paginatedItems
    }
  }

  useEffect(() => {
    setPage(1)
  }, [selectedFilters])

  useEffect(() => {
    setPage(initialPage)
  }, [])

  useEffect(() => {
    handleChangePagination(initialPage)
  }, [initialPage])

  // useEffect(() => {
  //   pageChanged(page)
  // }, [page])

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
            <Typography className={classes.title}>Your Positions</Typography>
            <TooltipHover text='Total number of your positions'>
              <Typography className={classes.positionsNumber}>
                {' '}
                {String(filteredData.length)}
              </Typography>
            </TooltipHover>
          </Grid>
          <Grid className={classes.searchWrapper}>
            <FilterSearch
              loading={loading}
              bp='md'
              networkType={currentNetwork}
              filtersAmount={2}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
            <Grid
              display='flex'
              columnGap={2}
              justifyContent='space-between'
              className={classes.fullWidthWrapper}>
              <TooltipHover text='Refresh'>
                <Grid display='flex' alignItems='center'>
                  <Button
                    disabled={showNoConnected}
                    onClick={showNoConnected ? () => {} : handleRefresh}
                    className={classes.refreshIconBtn}>
                    <img src={refreshIcon} className={classes.refreshIcon} alt='Refresh' />
                  </Button>
                </Grid>
              </TooltipHover>
              <Button className={classes.button} variant='contained' onClick={onAddPositionClick}>
                <span className={classes.buttonText}>+ Add Position</span>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction='column' className={classes.list} justifyContent='flex-start'>
        {filteredData.length > 0 && !loading ? (
          paginator(page).data.map((element, index) => (
            <Grid
              onClick={() => {
                navigate(`/position/${element.id}`)
              }}
              key={element.id}
              className={classes.itemLink}>
              <PositionItem key={index} {...element} />
            </Grid>
          ))
        ) : showNoConnected ? (
          <NoConnected {...noConnectedBlockerProps} />
        ) : loading ? (
          <Grid container style={{ flex: 1 }}>
            <img src={loader} className={classes.loading} alt='Loader' />
          </Grid>
        ) : (
          <EmptyPlaceholder
            desc={
              noInitialPositions
                ? 'Add your first position by pressing the button and start earning!'
                : 'Did not find any matching positions'
            }
            className={classes.placeholder}
            onAction={onAddPositionClick}
            withButton={noInitialPositions}
          />
        )}
      </Grid>
      {paginator(page).totalPages > 1 ? (
        <PaginationList
          pages={paginator(page).totalPages}
          defaultPage={defaultPage}
          handleChangePage={handleChangePagination}
          variant='end'
          page={page}
        />
      ) : null}
    </Grid>
  )
}
