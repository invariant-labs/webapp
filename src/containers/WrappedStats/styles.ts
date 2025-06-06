import { alpha, Theme } from '@mui/material'
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
  plotsRow: {
    marginBottom: 24,
    flexDirection: 'column',
    background: colors.invariant.component,
    borderRadius: 24,
    padding: 24,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  row: {
    marginBottom: 16
  },
  loading: {
    width: 150,
    height: 150,
    margin: 'auto'
  },
  plot: {
    width: 605,

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
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
  loadingOverlay: {
    position: 'relative',
    width: '100%',
    height: '100%',
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: alpha(colors.invariant.newDark, 0.7),
      backdropFilter: 'blur(4px)',
      zIndex: 1,
      pointerEvents: 'none',
      borderRadius: '24px'
    }
  }
}))

export default useStyles
