import React from 'react'
import { Pagination } from '@material-ui/lab'
import useStyle from './style'
import { useMediaQuery } from '@material-ui/core'
import { theme } from '@static/theme'
import classNames from 'classnames'
export interface IProps {
  pages: number
  defaultPage: number
  handleChangePage: (page: number) => void
  variant: string
  className?: string
}

export const PaginationList: React.FC<IProps> = ({
  pages,
  defaultPage,
  handleChangePage,
  variant,
  className
}) => {
  const classes = useStyle()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <div className={classNames(classes.root, className)} style={{ justifyContent: `${variant}` }}>
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
