import { makeStyles, Theme } from '@material-ui/core'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 1122,
    display: 'flex',
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
      color: colors.invariant.light
    },

    '& .MuiPaginationItem-page:hover': {
      color: colors.invariant.textGrey
    },

    '& .MuiPaginationItem-ellipsis': {
      color: colors.invariant.componentOut3
    },

    '& .Mui-selected': {
      color: colors.invariant.green
    },
    '& .Mui-selected:hover': {
      color: `${colors.invariant.green} !important`
    },

    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: 'transparent'
    },
    '& li:first-child button': {
      backgroundColor: colors.invariant.green,
      minWidth: 40,
      minHeight: 40,
      filter: 'brightness(0.8)'
    },

    '& li:last-child button': {
      backgroundColor: colors.invariant.green,
      minWidth: 40,
      minHeight: 40,
      filter: 'brightness(0.8)'
    },

    '& li:last-child button:hover': {
      backgroundColor: `${colors.invariant.green} !important`,
      filter: 'brightness(1.1)'
    },

    '& li:first-child button:hover': {
      backgroundColor: `${colors.invariant.green} !important`,
      filter: 'brightness(1.1)'
    },

    '& svg': {
      transform: 'scale(2.2)'
    }
  }
}))

export default useStyles
