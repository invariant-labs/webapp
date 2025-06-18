import { Pagination, useMediaQuery } from '@mui/material'
import { theme } from '@static/theme'
import { useStyles } from './style'
import { useEffect, useRef } from 'react'

export interface IPaginationList {
  pages: number
  defaultPage: number
  handleChangePage: (page: number) => void
  variant: string
  squeeze?: boolean
  page: number
  onIncrease?: () => void
  onDecrease?: () => void
}

export const PaginationList: React.FC<IPaginationList> = ({
  pages,
  handleChangePage,
  variant,
  squeeze = false,
  page,
  onIncrease,
  onDecrease
}) => {
  const { classes } = useStyles()
  const position = useMediaQuery(theme.breakpoints.down('sm'))
  const matches = useMediaQuery(theme.breakpoints.down('lg'))

  const prevPageRef = useRef<number>(page)
  const internalChangeRef = useRef(false)

  const handlePageChange = (newPage: number) => {
    if (newPage > prevPageRef.current) {
      onIncrease?.()
    } else if (newPage < prevPageRef.current) {
      onDecrease?.()
    }

    prevPageRef.current = newPage
    handleChangePage(newPage)
  }

  useEffect(() => {
    if (!internalChangeRef.current && page !== prevPageRef.current) {
      handlePageChange(page)
    }
    internalChangeRef.current = false
  }, [page])

  const onPaginationChange = (_e: React.ChangeEvent<unknown>, newPage: number) => {
    internalChangeRef.current = true
    handlePageChange(newPage)
  }

  return (
    <Pagination
      style={{
        justifyContent: position ? 'center' : variant
      }}
      className={classes.root}
      count={pages}
      shape='rounded'
      page={page}
      onChange={onPaginationChange}
      siblingCount={squeeze ? 0 : matches ? 0 : 1}
    />
  )
}
