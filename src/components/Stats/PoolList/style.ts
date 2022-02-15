import { makeStyles } from '@material-ui/core'
import { colors } from '@static/theme'

export const useStyle = makeStyles(theme => ({
  container: {
    maxWidth: 1072,
    width: '100%',
    backgroundColor: colors.invariant.component,
    borderRadius: 24,
    padding: '0 24px'
  },

  paginationLightColor: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },

    '& .MuiPaginationItem-page': {
      color: `${colors.invariant.light} !important`
    },
    '& .MuiPaginationItem-page:hover': {
      color: `${colors.invariant.textGrey} !important`
    },
    '& .Mui-selected': {
      color: `${colors.invariant.green} !important`
    },

    '& .Mui-selected:hover': {
      color: `${colors.invariant.green} !important`
    },
    '& li:first-child button': {
      backgroundColor: `${colors.invariant.green} !important`,
      filter: 'brightness(0.8)'
    },
    '& li:last-child button': {
      backgroundColor: `${colors.invariant.green} !important`,
      filter: 'brightness(0.8)'
    },
    '& li:first-child button:hover': {
      backgroundColor: `${colors.invariant.green} !important`,
      filter: 'brightness(1.2)'
    },
    '& li:last-child button:hover': {
      backgroundColor: `${colors.invariant.green} !important`,
      filter: 'brightness(1.2)'
    }
  }
}))
