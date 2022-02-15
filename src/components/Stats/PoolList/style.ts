import { makeStyles } from '@material-ui/core'
import { colors } from '@static/theme'

const useStyle = makeStyles(() => ({
  container: {
    width: 1072,
    padding: '0 24px',
    borderRadius: '24px',
    backgroundColor: `${colors.invariant.component} !important`
  },
  pagination: {
    padding: '20px 0 10px 0'
  },

  paginationDesign: {
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

    '& li:last-child button:hover': {
      backgroundColor: `${colors.invariant.green} !important`,
      filter: 'brightness(1.1)'
    },

    '& li:first-child button:hover': {
      backgroundColor: `${colors.invariant.green} !important`,
      filter: 'brightness(1.1)'
    }
  }
}))

export default useStyle
