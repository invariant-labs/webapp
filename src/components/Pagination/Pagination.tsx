import React from 'react'
import { Pagination } from '@material-ui/lab'
import useStyle from './style'
import { useMediaQuery } from '@material-ui/core'
import { theme } from '@static/theme'
export interface IProps {
  pages: number
  defaultPage: number
  handleChangePage: (page: number) => void
  variant: string
}

export const PaginationList: React.FC<IProps> = ({
  pages,
  defaultPage,
  handleChangePage,
  variant
}) => {
  const classes = useStyle()
  const position = useMediaQuery(theme.breakpoints.down('sm'))
  const matches = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <div className={classes.root} style={{ justifyContent: position ? 'center' : `${variant}` }}>
      <Pagination
        count={pages}
        shape='rounded'
        defaultPage={defaultPage}
        onChange={(_e, page) => handleChangePage(page)}
        siblingCount={matches ? 0 : 1}
      />
    </div>
  )
}
