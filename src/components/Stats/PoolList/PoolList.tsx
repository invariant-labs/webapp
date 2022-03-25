import React from 'react'
import { Grid } from '@material-ui/core'
import useStyle from './style'
import { PaginationList } from '@components/Pagination/Pagination'
import PoolListItem from '@components/Stats/PoolListItem/PoolListItem'
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

  const handleChangePagination = (currentPage: number) => setPage(currentPage)

  const paginator = (currentPage: number) => {
    const page = currentPage || 1
    const perPage = 10
    const offest = (page - 1) * perPage

    return data.slice(offest).slice(0, perPage)
  }

  const pages = Math.ceil(data.length / 10)

  return (
    <Grid container direction='column' classes={{ root: classes.container }}>
      <PoolListItem displayType='header' />
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
