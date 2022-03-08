import { Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  calculatorContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    borderRadius: 12,
    justifyContent: 'space-between',
    background: colors.invariant.light
  },

  calculator: {
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      minWidth: 0
    }
  },
  greenPart: {
    alignItems: 'center',
    width: 'auto',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      minWidth: 0
    }
  },
  greenText: {
    paddingRight: 8,
    ...typography.body1,
    color: colors.invariant.green,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      ...typography.caption1
    }
  },
  heading3: {
    padding: '14px 12px 14px 12px',
    color: colors.white.main,
    ...typography.heading3,
    flexWrap: 'nowrap'
  },
  currencyIcon: {
    marginRight: 12,
    minWidth: 20,
    height: 20,
    borderRadius: '100%',
    background: colors.invariant.greenLinearGradient
  }
}))

export default useStyles
