import { colors, typography } from '@static/theme'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  amountInput: {
    background: colors.invariant.newDark,
    color: colors.invariant.light,
    borderRadius: 20,
    ...typography.heading2,
    width: '100%',
    textAlign: 'right',
    transition: 'all .4s',
    '& ::placeholder': {
      textAlign: 'right'
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
    lineHeight: '14px',

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
  select: {
    marginRight: 20
  },
  input: {
    textAlign: 'right',
    color: colors.white.main,
    '& ::placeholder': {
      textAlign: 'right'
    }
  },
  label: {
    top: -1,
    color: colors.invariant.dark
  },
  balanceContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    paddingBlock: 6,
    flexShrink: 1,
    marginRight: 10
  },
  BalanceTypography: {
    color: colors.invariant.lightGrey,
    ...typography.caption2,
    marginRight: 3,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'flex',
    alignItems: 'center'
  },
  walletBalanace: {
    color: colors.invariant.lightGrey
  },
  exchangeContainer: {
    padding: '10px 15px 0  15px ',
    display: 'flex'
  },
  noData: {
    color: colors.invariant.warning,
    ...typography.caption2,
    display: 'flex',
    flexDirection: 'row',
    cursor: 'default',
    paddingBottom: 10
  },
  noDataIcon: {
    marginRight: 5,
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
  loading: {
    width: 15,
    height: 15
  },
  loadingBalance: {
    padding: '0 10px 0 20px',
    width: 15,
    height: 15
  },
  tooltip: {
    background: colors.invariant.componentBcg,
    border: `1px solid ${colors.invariant.lightGrey}`,
    borderRadius: 12,
    padding: 10,
    ...typography.caption4,
    fontSize: 13,
    color: colors.white.main
  },
  percentages: {
    flexShrink: 0,
    width: 'fit-content',
    justifyContent: 'end',
    height: 17
  },
  percentage: {
    ...typography.tiny1,
    borderRadius: 5,
    paddingInline: 5,
    marginRight: 3,
    height: 16,
    lineHeight: '16px',
    display: 'flex',
    flexShrink: 0,
    marginTop: 1
  },
  percentagePositive: {
    color: colors.invariant.green,
    backgroundColor: `${colors.invariant.green}40`
  },
  percentageNegative: {
    color: colors.invariant.Error,
    backgroundColor: `${colors.invariant.Error}40`
  },
  caption2: {
    ...typography.caption2,
    color: colors.invariant.lightHover,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    '&:hover': {
      color: colors.white.main
    }
  },
  bottom: {
    paddingInline: 15
  }
}))

export default useStyles
