import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  amountInput: {
    background: colors.invariant.dark,
    color: colors.white.main,
    borderRadius: 15,
    ...typography.heading4,
    width: '100%',
    height: 48,
    paddingInline: 16
  },
  input: {
    paddingTop: 4,
    '&:focus': {
      color: colors.white.main
    }
  }
}))

export default useStyles
