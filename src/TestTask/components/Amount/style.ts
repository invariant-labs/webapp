import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: 'relative',

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
    },

    ['@media(max-width: 420px)']: {
      gridTemplateAreas: `
      "select select select select"
      "balance balance balance balance"
      "percentages percentages percentages percentages"
      `
    }
  },
  inputContainer: {
    gridColumn: '1/-1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,

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
    cursor: 'pointer',
    transition: 'background-color 150ms ease-out',

    '&:hover': {
      backgroundColor: `${colors.invariant.component}`
    },

    [theme.breakpoints.down('sm')]: {
      height: 36,
      minWidth: 85
    }
  },
  percentages: {
    gridArea: 'percentages',
    justifyContent: 'end',
    height: 17
  },
  percentageContainer: {
    transition: 'all 150ms ease-out',
    display: 'flex',
    ['@media(max-width: 420px)']: {
      margin: '2px auto 0 0'
    }
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
    padding: '0px 5px',
    transition: 'all 150ms ease-out',
    ['@media(max-width: 420px)']: {
      order: 2,
      margin: '0 0 0 5px'
    }
  },
  currencyIcon: {
    minWidth: 20,
    height: 20,
    marginRight: 8,
    borderRadius: '100%'
  },
  currencySymbol: {
    ...typography.body3,
    color: colors.white.main
  },
  currencyIconGradient: {
    background: 'radial-gradient(96.25% 96.25% at 50% 3.75%, #9AC8E9 0%, #5B8DC8 100%)',
    width: 20,
    height: 20,
    borderRadius: '50%',
    marginRight: 8
  },
  noCurrencyText: {
    ...typography.body3,
    color: colors.white.main,
    cursor: 'default'
  },
  balance: {
    gridArea: 'balance',
    height: 17,
    cursor: 'pointer'
  },
  caption2: {
    display: 'flex',
    flexDirection: 'row',
    miWidth: 'max-content',
    ...typography.caption2,
    color: colors.invariant.lightHover,

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
    marginTop: 1,
    background: ' rgba(46, 224, 154, 0.8)',

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
  noData: {
    color: colors.invariant.warning,
    ...typography.caption2,
    display: 'grid',
    gap: 5.45,
    gridAutoFlow: 'column',
    cursor: 'default'
  },
  noDataIcon: {
    height: 9.5,
    width: 9.5,
    border: '1px solid #EFD063',
    color: colors.invariant.warning,
    borderRadius: '50%',
    fontSize: 8,
    lineHeight: '10px',
    fontWeight: 400,
    textAlign: 'center',
    alignSelf: 'center',
    cursor: 'default'
  },
  blocker: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 11,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(11, 12, 13, 0.88)',
    filter: 'blur(4px) brightness(0.4)'
  },
  blockedInfoWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 12,
    height: '100%'
  },
  blockedInfo: {
    ...typography.body2,
    color: colors.invariant.lightHover
  }
}))

export default useStyles
