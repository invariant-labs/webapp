import React from 'react'
import { Pagination } from '@material-ui/lab'
import useStyle from './style'
import { useWindowWidth } from '@react-hook/window-size'
export interface IProps {
  pages: number
  defaultPage: number
  handleChangePage: (event: React.ChangeEvent<unknown>, page: number) => void
}

export const PaginationList: React.FC<IProps> = ({ pages, defaultPage, handleChangePage }) => {
  const classes = useStyle()
  const onlyWidth = useWindowWidth()
  return (
    <div className={classes.root}>
      <Pagination
        count={pages}
        shape='rounded'
        defaultPage={defaultPage}
        onChange={(e, page) => handleChangePage(e, page)}
        siblingCount={onlyWidth > 600 ? 1 : 0}
      />
    </div>
  )
}
