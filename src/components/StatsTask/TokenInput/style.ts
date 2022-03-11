import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    backgroundColor: colors.invariant.component,
    position: 'relative',
    borderRadius: 24,

    [theme.breakpoints.down('sm')]: {
      minWidth: 0
    }
  },
  root: {
    width: '100%',
    backgroundColor: colors.invariant.componentBcg,
    borderRadius: 20,
    padding: '6px 12px 6px 12px',
    ...typography.heading2,
    display: 'grid',
    gridTemplateAreas: `
    "select select select select"
    "balance balance percentages percentages"
    `,
    [theme.breakpoints.down('sm')]: {
      gridTemplateAreas: `
    "select select select select"
    "balance balance balance percentages"
    `
    },

    '& $input': {
      color: colors.white.main,
      position: 'relative',
      top: 1,
      textAlign: 'end',
      ...typography.heading2
    },

    '& $input::placeholder': {
      color: colors.invariant.light
    },

    [theme.breakpoints.down('xs')]: {
      '& $input': {}
    }
  },
  inputContainer: {
    gridColumn: '1/-1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    paddingBottom: 6,

    [theme.breakpoints.down('xs')]: {
      marginBottom: 0
    }
  },
  currency: {
    height: 36,
    minWidth: 85,
    width: 'fit-content',
    flexShrink: 0,
    borderRadius: 11,
    backgroundColor: colors.invariant.light,
    padding: '6px 12px 6px 12px',

    [theme.breakpoints.down('sm')]: {
      height: 36,
      minWidth: 85
    }
  },
  currencyIcon: {
    minWidth: 20,
    height: 20,
    marginRight: 8,
    borderRadius: '100%',
    background: 'radial-gradient(96.25% 96.25% at 50% 3.75%, #9AC8E9 0%, #5B8DC8 100%)'
  },
  currencySymbol: {
    ...typography.body3,
    color: colors.white.main
  },
  noCurrencyText: {
    ...typography.body3,
    color: colors.white.main
  },
  balance: {
    gridArea: 'balance',
    height: 17
  },
  caption2: {
    display: 'flex',
    flexWrap: 'nowrap',
    cursor: 'pointer',
    ...typography.caption2,
    color: colors.invariant.textGrey,
    letterSpacing: '-0.03em',

    '&:hover': {
      color: colors.white.main
    }
  },
  maxButton: {
    color: colors.invariant.componentBcg,
    ...typography.tiny2,
    borderRadius: 4,
    width: 26,
    minWidth: 26,
    height: 14,
    textTransform: 'none',
    marginLeft: 4,
    background: ' rgba(46, 224, 154, 0.8)',
    letterSpacing: '-0.03em',

    '&:hover': {
      background: 'none',
      backgroundColor: colors.invariant.green,
      boxShadow: '0px 0px 20px -10px white'
    },
    [theme.breakpoints.down('sm')]: {
      width: 26,
      minWidth: 26,
      height: 14,
      marginTop: 2
    }
  },
  maxButtonNotActive: {
    backgroundColor: colors.invariant.light,
    '&:hover': {
      backgroundColor: colors.invariant.light,
      cursor: 'default'
    }
  },
  percentages: {
    gridArea: 'percentages',
    justifyContent: 'end',
    height: 17
  },
  percentage: {
    color: colors.invariant.Error,
    ...typography.tiny1,
    backgroundColor: 'rgba(251, 85, 95, 0.2)',
    borderRadius: 5,
    width: 39,
    textAlign: 'center',
    marginRight: 3,
    height: 16,
    lineHeight: '16px',
    letterSpacing: '-0.03em'
  },
  volumeHeader: {
    margin: '24px 0 24px 0',
    color: colors.invariant.text,
    ...typography.heading4
  }
}))

export default useStyles
