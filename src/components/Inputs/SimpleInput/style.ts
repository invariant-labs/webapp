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
    paddingInline: 16,
    display: 'flex'
  },
  input: {
    paddingTop: 4,
    '&:focus': {
      color: colors.white.main
    },
    flex: 1
  },
  globalPrice: {
    color: colors.invariant.blue,
    width: 'auto'
  },
  globalPriceTooltip: {
    background: colors.invariant.component,
    boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.35)',
    borderRadius: 8,
    padding: '6px 8px',
    boxSizing: 'border-box'
  },
  textGlobalPrice: {
    ...typography.caption4
  }
}))

export default useStyles
