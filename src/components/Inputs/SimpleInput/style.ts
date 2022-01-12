import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  amountInput: {
    background: colors.invariant.componentIn1,
    color: colors.white.main,
    borderRadius: 8,
    ...typography.heading4,
    width: '100%',
    border: `1px solid ${colors.invariant.componentOut2}`,
    height: 44,
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
