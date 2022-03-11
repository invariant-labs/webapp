import { makeStyles, Theme } from '@material-ui/core'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  tokenHeader: {
    color: colors.white.main,
    ...typography.heading4,
    padding: '24px 0 24px 24px'
  },

  tokenInfoContainer: {
    hight: 386,
    padding: 0,
    backgroundColor: colors.invariant.component,
    borderRadius: 24,
    width: 256
  },

  tokenChart: {
    height: 140,
    width: 'auto',
    marginTop: 32
  },

  tokenSummary: {
    height: 122,
    width: 'auto'
  }
}))

export default useStyles
