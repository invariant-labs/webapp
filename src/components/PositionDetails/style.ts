import { theme } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  mainContainer: {
    flex: 1,
    width: '100%'
  },
  container: {
    display: 'flex',
    gap: 16,
    marginTop: 24,
    marginBottom: 48,

    [theme.breakpoints.down(1040)]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: 24,
      marginBottom: 0
    }
  },
  leftSide: {
    width: 464,

    [theme.breakpoints.down(1040)]: {
      flexGrow: 1,
      width: '100%'
    }
  },
  rightSide: {
    flexGrow: 1
  },
  information: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  }
}))
