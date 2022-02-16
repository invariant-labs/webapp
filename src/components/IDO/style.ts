import { makeStyles } from '@material-ui/core'
import { typography, colors } from '@static/theme'

const useStyle = makeStyles(theme => ({
  idoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: '0 16px'
    }
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 500,
    position: 'relative',
    paddingBottom: 9,
    '& h1': {
      ...typography.heading4,
      color: colors.white.main
    }
  },
  root: {
    background: colors.invariant.component,
    borderRadius: 24,
    paddingInline: 24,
    paddingBottom: 22,
    paddingTop: 16,
    width: 500
  },

  depositHeader: {
    '& h1': {
      ...typography.heading3,
      color: colors.white.main
    }
  }
}))

export default useStyle
