import { PaginationList } from '@components/PositionsList/Pagination/Pagination'
import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useStyle } from './style'

interface PoolListInterface {
  data: Array<{ symbolFrom: string; symbolTo: string; fee: string; volume: string; TVL: string }>
}

const PoolList: React.FC<PoolListInterface> = ({ data }) => {
  const [page, setPage] = React.useState<number>(1)

  const classes = useStyle()

  const handleChangePage = (currentPage: number) => setPage(currentPage)

  const ContentPerPage = (currentPage: number) => {
    const contentPerPage = 7

    const dataPerPage = (currentPage - 1) * contentPerPage

    return data.slice(dataPerPage).slice(0, contentPerPage)
  }

  const resultPerPage = ContentPerPage(page)

  const pages = Math.ceil(data.length / 7)

  return (
    <Grid className={classes.container}>
      <Typography style={{ color: 'white' }}> soon </Typography>
      <Grid>
        <PaginationList handleChangePage={handleChangePage} pages={pages} defaultPage={0} />
      </Grid>
    </Grid>
  )
}

export default PoolList
