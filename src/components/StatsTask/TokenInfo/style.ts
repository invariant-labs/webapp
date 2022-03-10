import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  volumeHeader: {
    color: colors.white.main,
    ...typography.heading4,
    padding: '24px 0 24px 24px'
  },
  root: {
    width: 256,
    height: 386,
    padding: 0,
    backgroundColor: colors.invariant.component,
    borderRadius: 24
  },
  tokenDetails: {
    height: 122,
    width: 'auto'
  },
  tokenChart: {
    height: 140,
    width: 'auto',
    marginTop: 32
  }
}))

export default useStyles
