import React, { useMemo, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import useStyle from './style'
import { PaginationList } from '@components/Pagination/Pagination'
import PoolListItem, { SortType } from '@components/Stats/PoolListItem/PoolListItem'

interface PoolListInterface {
  data: Array<{
    symbolFrom: string
    symbolTo: string
    iconFrom: string
    iconTo: string
    volume: number
    TVL: number
    fee: number
  }>
}

const PoolList: React.FC<PoolListInterface> = ({ data }) => {
  const classes = useStyle()
  const [page, setPage] = React.useState(1)
  const [sortType, setSortType] = React.useState(SortType.VOLUME_DESC)

  const sortedData = useMemo(() => {
    switch (sortType) {
      case SortType.NAME_ASC:
        return data.sort((a, b) =>
          `${a.symbolFrom}/${a.symbolTo}`.localeCompare(`${b.symbolFrom}/${b.symbolTo}`)
        )
      case SortType.NAME_DESC:
        return data.sort((a, b) =>
          `${b.symbolFrom}/${b.symbolTo}`.localeCompare(`${a.symbolFrom}/${a.symbolTo}`)
        )
      case SortType.FEE_ASC:
        return data.sort((a, b) => a.fee - b.fee)
      case SortType.FEE_DESC:
        return data.sort((a, b) => b.fee - a.fee)
      case SortType.VOLUME_ASC:
        return data.sort((a, b) => a.volume - b.volume)
      case SortType.VOLUME_DESC:
        return data.sort((a, b) => b.volume - a.volume)
      case SortType.TVL_ASC:
        return data.sort((a, b) => a.TVL - b.TVL)
      case SortType.TVL_DESC:
        return data.sort((a, b) => b.TVL - a.TVL)
    }
  }, [data, sortType])

  useEffect(() => {
    setPage(1)
  }, [data])

  const handleChangePagination = (currentPage: number) => setPage(currentPage)

  const paginator = (currentPage: number) => {
    const page = currentPage || 1
    const perPage = 10
    const offest = (page - 1) * perPage

    return sortedData.slice(offest).slice(0, perPage)
  }

  const pages = Math.ceil(data.length / 10)

  return (
    <Grid container direction='column' classes={{ root: classes.container }}>
      <PoolListItem displayType='header' onSort={setSortType} sortType={sortType} />
      {paginator(page).map((element, index) => (
        <PoolListItem
          displayType='token'
          tokenIndex={index + 1 + (page - 1) * 10}
          symbolFrom={element.symbolFrom}
          symbolTo={element.symbolTo}
          iconFrom={element.iconFrom}
          iconTo={element.iconTo}
          volume={element.volume}
          TVL={element.TVL}
          fee={element.fee}
        />
      ))}
      <Grid className={classes.pagination}>
        <PaginationList
          pages={pages}
          defaultPage={1}
          handleChangePage={handleChangePagination}
          variant='flex-end'
        />
      </Grid>
    </Grid>
  )
}

export default PoolList
