import { Theme } from '@mui/material'
import { typography, colors } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles<{ isXs: boolean }>()((theme: Theme, { isXs }) => ({
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

  searchIcon: {
    width: 17
  },
  rowContainer: {
    display: 'flex',
    flexDirection: isXs ? 'column' : 'row',
    alignItems: isXs ? 'flex-start' : 'flex-end',
    justifyContent: 'space-between',
    width: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  }
}))

export default useStyles
