import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: 44,
    backgroundColor: colors.invariant.componentIn1,
    border: `1px solid ${colors.invariant.componentOut2}`,
    borderRadius: 5,
    padding: 9,
    ...newTypography.body2,

    '& $input': {
      paddingInline: 8,
      paddingTop: 7
    }
  },
  currency: {
    height: 26,
    minWidth: 51,
    width: 'fit-content',
    flexShrink: 0,
    paddingInline: 5,
    borderRadius: 3,
    backgroundColor: colors.invariant.componentOut2
  },
  currencyIcon: {
    minWidth: 14,
    height: 14,
    marginRight: 3
  },
  currencySymbol: {
    ...newTypography.body3,
    color: colors.white.main,
    marginTop: 1
  },
  noCurrencyText: {
    ...newTypography.body3,
    color: colors.invariant.lightInfoText
  },
  maxButton: {
    backgroundColor: colors.invariant.accent2,
    color: colors.invariant.darkInfoText,
    ...newTypography.body3,
    borderRadius: 3,
    width: 40,
    minWidth: 40,
    height: 26,
    textTransform: 'none',

    '&:hover': {
      backgroundColor: colors.invariant.logoGreen
    }
  }
}))

export default useStyles
