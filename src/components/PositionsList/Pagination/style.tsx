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
      color: colors.invariant.light,
      '&:hover': {
        color: colors.invariant.lightGrey
      }
    },
    '& .MuiPaginationItem-ellipsis': {
      color: colors.invariant.light
    },
    '& .Mui-selected': {
      color: colors.invariant.green
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: 'transparent',
      '&:hover': {
        color: colors.invariant.green
      }
    },
    '& li:first-child button': {
      backgroundColor: colors.invariant.green,
      minWidth: 40,
      minHeight: 40,
      opacity: 0.8
    },
    '& li:first-child button:hover': {
      opacity: 1
    },
    '& li:last-child button': {
      backgroundColor: colors.invariant.green,
      minWidth: 40,
      minHeight: 40,
      opacity: 0.8
    },
    '& li:last-child button:hover': {
      opacity: 1
    },
    '& svg': {
      transform: 'scale(2.2)'
    }
  }
}))

export default useStyles
