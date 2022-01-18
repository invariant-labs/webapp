import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  inputLabel: {
    ...typography.body3,
    color: colors.invariant.lightInfoText,
    marginBottom: 3
  },
  title: {
    color: colors.white.main,
    ...typography.heading4
  },
  logoShort: {
    minWidth: 40,
    height: 30,
    marginRight: 8
  }
}))

export default useStyles
