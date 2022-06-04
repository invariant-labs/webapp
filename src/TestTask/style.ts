import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'
import { findLastIndex } from 'lodash'

const useStyles = makeStyles(() => ({
  rootBackground: {
    background: '#0b090d',
    minHeight: 'calc(100% + 40px)',
    width: '100%'
  },
  root: {
    padding: 10,
    background:
      'radial-gradient(118.38% 303.54% at 3.96% 118.38%, rgba(119, 72, 216, 0.1) 0%, rgba(119, 72, 216, 0) 100%), radial-gradient(57.34% 103.84% at 50% 0%, rgba(156, 231, 90, 0.1) 0%, rgba(156, 231, 90, 0) 100%)',
    minHeight: '100%',
    width: '100%'
  },
  mainWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column'
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    flexWrap: 'nowrap',
    maxWidth: 740,
    margin: '96px auto 126px auto',
    minHeight: '100%',
    maxHeight: 430,

    ['@media(max-width: 580px)']: {
      flexDirection: 'column',
      maxHeight: '100%',
      margin: '0px auto 0px auto'
    }
  },
  walletContainer: {
    maxWidth: 464,
    margin: '0 20px 0 0',
    minHeight: '100%',

    ['@media(max-width: 580px)']: {
      margin: '0 0 10px 0',
      maxWidth: '100%'
    }
  },
  statsContainer: {
    maxWidth: 256,
    minHeight: '100%',

    ['@media(max-width: 580px)']: {
      maxWidth: '100%'
    }
  }
}))

export default useStyles
