import { Theme } from '@mui/material'
import { typography, colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
  wrapper: {
    maxWidth: 1072,
    minHeight: '100%'
  },
  subheader: {
    ...typography.heading4,
    color: colors.white.main
  },
  plotsRow: {
    marginBottom: 24,
    flexDirection: 'row',

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
    width: 524,

    '&:first-child': {
      marginRight: 24
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',

      '&:first-child': {
        marginRight: 0,
        marginBottom: 24
      }
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
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  container: {
    width: '100%'
  }
}))

export default useStyles
