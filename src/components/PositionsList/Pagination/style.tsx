import { makeStyles } from '@material-ui/core'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiPagination-ul': {
      flexWrap: 'nowrap'
    },
    '& .MuiPaginationItem-icon': {
      color: colors.black.full
    },
    '& .MuiPaginationItem-page': {
      color: colors.invariant.componentOut3,
      fontSize: 20
    },
    '& .MuiPaginationItem-ellipsis': {
      color: colors.invariant.componentOut3
    },
    '& .Mui-selected': {
      color: colors.invariant.accent2
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: 'transparent'
    },
    '& li:first-child button': {
      backgroundColor: colors.invariant.accent2,
      minWidth: 40,
      minHeight: 40
    },
    '& li:last-child button': {
      backgroundColor: colors.invariant.accent2,
      minWidth: 40,
      minHeight: 40
    },
    '& li:last-child button:hover': {
      backgroundColor: colors.green.shine
    },
    '& svg': {
      transform: 'scale(2.2)'
    }
  }
}))

export default useStyles
