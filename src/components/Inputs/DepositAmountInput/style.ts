import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: 'relative',
    minWidth: 416,
    marginBottom: 16,

    [theme.breakpoints.down('sm')]: {
      minWidth: 0
    }
  },
  root: {
    width: '100%',
    backgroundColor: colors.invariant.componentBcg,
    borderRadius: 20,
    padding: '12px 12px 6px 12px',
    ...newTypography.heading2,
    display: 'grid',
    gridTemplateAreas: `
    "select select"
    "balance percentages"
    `,

    '& $input': {
      color: colors.white.main,
      textAlign: 'end',
      ...newTypography.heading2
    },

    '& $input::placeholder': {
      color: colors.invariant.light
    },

    [theme.breakpoints.down('sm')]: {
      height: 84,
      '& $input': {
        paddingTop: 12
      }
    }
  },
  inputContainer: {
    gridColumn: '1/-1',
    display: 'flex'
  },
  currency: {
    height: 36,
    minWidth: 83,
    width: 'fit-content',
    flexShrink: 0,
    borderRadius: 11,
    backgroundColor: colors.invariant.light,
    padding: '6px 12px 6px 12px',

    [theme.breakpoints.down('sm')]: {
      height: 36,
      minWidth: 83
    }
  },
  balance: {
    gridArea: 'balance',
    height: 17
  },
  percentages: {
    gridArea: 'percentages',
    justifyContent: 'end',
    height: 17
  },
  percentage: {
    color: colors.invariant.Error,
    ...newTypography.tiny1,
    backgroundColor: 'rgba(251, 85, 95, 0.2)',
    borderRadius: 5,
    width: 39,
    textAlign: 'center',
    marginRight: 3,
    height: 16,
    lineHeight: '16px'
  },
  currencyIcon: {
    minWidth: 20,
    height: 20,
    marginRight: 3,
    borderRadius: '100%'
  },
  currencySymbol: {
    ...newTypography.body3,
    color: colors.white.main,
    marginTop: 1
  },
  noCurrencyText: {
    ...newTypography.body3,
    color: colors.white.main
  },
  caption2: {
    ...newTypography.caption2,
    color: colors.invariant.lightHover
  },
  maxButton: {
    backgroundColor: colors.invariant.green,
    color: colors.invariant.componentBcg,
    ...newTypography.tiny2,
    borderRadius: 3,
    width: 26,
    minWidth: 26,
    height: 14,
    textTransform: 'none',
    marginLeft: 4,
    '&:hover': {
      backgroundColor: colors.invariant.green,
      boxShadow: '0px 0px 20px -10px white'
    },
    [theme.breakpoints.down('sm')]: {
      width: 26,
      minWidth: 26,
      height: 14
    }
  },
  maxButtonNotActive: {
    backgroundColor: colors.invariant.light,
    '&:hover': {
      backgroundColor: colors.invariant.light
    }
  },
  noData: {
    color: colors.invariant.warning,
    ...newTypography.caption2,
    display: 'grid',
    gap: 5.45,
    gridAutoFlow: 'column'
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
    alignSelf: 'center'
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
    ...newTypography.body2,
    color: colors.invariant.lightHover
  }
}))

export default useStyles
