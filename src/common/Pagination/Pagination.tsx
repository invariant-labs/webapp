import { Pagination, useMediaQuery } from '@mui/material'
import { theme } from '@static/theme'
import { useStyles } from './style'

export interface IPaginationList {
  pages: number
  defaultPage: number
  handleChangePage: (page: number) => void
  variant: string
  squeeze?: boolean
  page?: number
}

export const PaginationList: React.FC<IPaginationList> = ({
  pages,
  defaultPage,
  handleChangePage,
  variant,
  squeeze = false,
  page
}) => {
  const { classes } = useStyles()
  const position = useMediaQuery(theme.breakpoints.down('sm'))
  const matches = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <Pagination
      style={{
        justifyContent: position ? 'center' : `${variant}`
      }}
      className={classes.root}
      count={pages}
      shape='rounded'
      defaultPage={defaultPage}
      onChange={(_e, page) => handleChangePage(page)}
      siblingCount={squeeze ? 0 : matches ? 0 : 1}
      page={page}
    />
  )
}
