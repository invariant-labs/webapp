import React from 'react'
import { Pagination } from '@material-ui/lab'
import useStyle from './style'
export interface IProps {
  pages: number
  defaultPage: number
  handleChangePage: Function
}

export const PaginationList: React.FC<IProps> = ({ pages, defaultPage, handleChangePage }) => {
  const classes = useStyle()
  return (
    <div className={classes.root}>
      <Pagination
        count={pages}
        shape='rounded'
        defaultPage={defaultPage}
        onChange={(e, page) => handleChangePage(e, page)}
      />
    </div>
  )
}
