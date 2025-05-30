import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  amountInput: {
    background: colors.invariant.dark,
    color: colors.white.main,
    borderRadius: 15,
    ...typography.heading4,
    width: '100%',
    height: 56,
    paddingInline: 8
  },
  input: {
    paddingTop: 4,
    '&:focus': {
      color: colors.white.main
    }
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
  },
  suggestedPriceText: {
    width: 148,
    fontSize: 14,
    lineHeight: 0.8
  }
}))

export default useStyles
