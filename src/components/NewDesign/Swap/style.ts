import { importantStyles } from '@consts/uiUtils'
import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: colors.navy.component,
    borderRadius: 10,
    padding: 24,
    paddingTop: 16
  },
  tokenComponentText: {
    color: colors.navy.veryLightGrey,
    marginBottom: 10,
    ...typography.body1
  },
  arrowText: {
    color: colors.navy.veryLightGrey,
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'center',
    ...typography.body1
  },
  rateText: {
    color: colors.navy.veryLightGrey,
    marginTop: 16,
    textAlign: 'right',
    ...typography.subtitle1
  },
  swapButton: {
    width: '100%',
    height: 60,
    marginTop: 24,
    ...importantStyles(typography.heading4)
  }
}))

export default useStyles
