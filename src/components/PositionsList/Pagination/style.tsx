import { makeStyles, Theme } from '@material-ui/core'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 1122,
    display: 'flex',
    justifyContent: 'end',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    '& .MuiPagination-ul': {
      flexWrap: 'nowrap',
      margin: '10px 0 10px'
    },
    '& .MuiPaginationItem-icon': {
      color: colors.black.full
    },
    '& .MuiPaginationItem-page': {
      ...typography.heading4,
      color: colors.invariant.componentOut3
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
