import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  displayContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    borderRadius: 12,
    backgroundColor: colors.invariant.light,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  displayCalculator: {
    alignItems: 'center',
    diplay: 'flex',

    [theme.breakpoints.down('sm')]: {
      minWidth: 0
    }
  },

  displayAmount: {
    alignItems: 'center',
    paddingRight: 12,
    display: 'flex',
    justifyContent: 'end',

    [theme.breakpoints.down('sm')]: {
      minWidth: 0
    }
  },

  displayChange: {
    display: 'flex',
    flexWrap: 'nowrap',
    color: colors.white.main,
    ...typography.heading3,
    alignItems: 'center',
    height: 14,
    padding: '14px 12px 14px 12px'
  },

  displayText: {
    fontSize: 16,
    lineHeight: '24px',
    color: colors.invariant.green,
    whiteSpace: 'nowrap',
    height: 12,
    padding: '15px 8px 15px 0',
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center'
  },

  currencyIcon: {
    height: 28,
    background: 'radial-gradient(96.25% 96.25% at 50% 3.75%, #9AC8E9 0%, #5B8DC8 100%)',
    minWidth: 28,
    borderRadius: '100%'
  },

  displayCurrencyIcon: {
    marginLeft: 8,
    height: 18,
    borderRadius: '100%',
    background: 'radial-gradient(96.25% 96.25% at 50% 3.75%, #9AC8E9 0%, #5B8DC8 100%)',
    minWidth: 18
  }
}))

export default useStyles
