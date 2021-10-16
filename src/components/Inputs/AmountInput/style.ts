import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  amountInput: {
    background: colors.invariant.yellowWeak,
    color: colors.invariant.violetStrong,
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 10,
    height: 60,
    fontSize: 24,
    minWidth: 150,
    width: '100%'
  },
  input: {
    width: 'calc(100% - 102px)',
    paddingTop: 2
  },
  currency: {
    minWidth: 'fit-content',
    height: '100%',
    justifyContent: 'flex-end'
  },
  currencyText: {
    ...typography.body2,
    color: colors.invariant.violetStrong,
    position: 'relative',
    top: -2
  },
  divider: {
    backgroundColor: colors.invariant.violetWeak,
    height: 40,
    marginRight: 5
  },
  avatarIcon: {
    minWidth: 30,
    height: 30,
    marginRight: 7
  }
}))

export default useStyles
