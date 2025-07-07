import { Theme } from '@mui/material'
import { typography, colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
  wrapper: {
    maxWidth: 1210,
    minHeight: '100%',
    flexDirection: 'column'
  },
  emptyWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subheader: {
    ...typography.heading4,
    color: colors.white.main
  },
  row: {
    marginBottom: 16
  },
  loading: {
    width: 150,
    height: 150,
    margin: 'auto'
  },
  searchBar: {
    width: 221,
    height: 32,
    padding: '7px 12px',
    borderRadius: 10,
    background: colors.invariant.black,
    border: '1px solid #202946',
    color: colors.invariant.lightGrey,
    ...typography.body2,
    marginBottom: 8,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 48
    }
  },
  searchIcon: {
    width: 17
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  headerContainer: {
    display: 'flex',
    gap: 14,

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },

  showFavouritesButton: {
    height: 40,
    background: colors.invariant.component,
    padding: '6px 8px',
    borderRadius: 9,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textTransform: 'none',

    '&:hover': {
      background: colors.invariant.componentDark,
      boxShadow: 'none'
    },

    '& .MuiTouchRipple-root .MuiTouchRipple-child': {
      backgroundColor: colors.invariant.lightGrey
    },

    [theme.breakpoints.down('md')]: {
      minWidth: 40,
      width: 40
    }
  },

  showFavouritesText: {
    ...typography.body2,
    color: colors.invariant.textGrey,
    marginTop: 2
  }
}))

export default useStyles
