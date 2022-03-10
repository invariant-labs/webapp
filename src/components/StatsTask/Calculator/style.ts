import { Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  calculatorContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    background: colors.invariant.light
  },

  calculator: {
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      minWidth: 0
    }
  },
  greenPart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    paddingRight: 12,
    [theme.breakpoints.down('sm')]: {
      minWidth: 0
    }
  },
  greenText: {
    display: 'flex',
    alignItems: 'center',
    height: 12,
    padding: '15px 8px 15px 0',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    color: colors.invariant.green,
    whiteSpace: 'nowrap'
  },
  heading3: {
    display: 'flex',
    alignItems: 'center',
    height: 14,
    padding: '14px 12px 14px 12px',
    color: colors.invariant.text,
    ...typography.heading3,
    flexWrap: 'nowrap'
  },
  currencyIcon: {
    minWidth: 28,
    height: 28,
    borderRadius: '100%',
    background: 'radial-gradient(96.25% 96.25% at 50% 3.75%, #9AC8E9 0%, #5B8DC8 100%)'
  },
  outputIcon: {
    minWidth: 18,
    height: 18,
    borderRadius: '100%',
    background: 'radial-gradient(96.25% 96.25% at 50% 3.75%, #9AC8E9 0%, #5B8DC8 100%)'
  }
}))

export default useStyles
