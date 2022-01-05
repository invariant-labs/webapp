import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiPaginationItem-icon': {
      color: 'black',
      width: 30,
      height: 30
    },
    '& .MuiPaginationItem-page': {
      color: '#4D4757'
    },
    '& .MuiPaginationItem-ellipsis': {
      color: '#4D4757'
    },
    '& .Mui-selected': {
      color: '#9DD46D'
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: 'transparent'
    },
    '& li:first-child button': {
      backgroundColor: '#9DD46D'
    },
    '& li:last-child button': {
      backgroundColor: '#9DD46D'
    }
  }
}))

export default useStyles
