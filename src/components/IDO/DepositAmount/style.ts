import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  inputLabel: {
    ...typography.body3,
    color: colors.invariant.lightInfoText,
    marginBottom: 3
  },
  currencyInputLabel: {
    ...typography.body3,
    color: colors.invariant.lightInfoText,
    marginRight: 16,
    fontSize: 12
  },
  title: {
    color: colors.white.main,
    ...typography.heading4
  },
  logo: {
    width: 42,
    height: 32
  }
}))

export default useStyles
