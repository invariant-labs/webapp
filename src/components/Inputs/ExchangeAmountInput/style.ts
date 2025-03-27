import { Theme } from '@mui/material'
import { colors, typography } from '@static/theme'
import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme: Theme) => ({
  amountInput: {
    background: colors.invariant.newDark,
    color: colors.invariant.light,
    borderRadius: 20,
    ...typography.heading2,
    width: '100%',
    textAlign: 'right',
    transition: 'all .3s',
    '& ::placeholder': {
      textAlign: 'right'
    }
  },
  actionButton: {
    ...typography.tiny2,
    borderRadius: 4,
    width: 26,
    minWidth: 26,
    height: 14,
    fontWeight: '600',

    padding: '0px 15px',
    textTransform: 'none',
    marginLeft: 4,
    lineHeight: '14px',
    color: colors.invariant.componentBcg,
    transition: '300ms',

    [theme.breakpoints.down('md')]: {
      width: 26,
      minWidth: 26,
      height: 14,
      marginTop: 2
    },

    '&:hover': {
      background: 'none',
      backgroundColor: colors.invariant.green,
      boxShadow: '0px 0px 20px -10px white',
      '@media (hover: none)': {
        background: ' rgba(46, 224, 154, 0.8)',
        boxShadow: 'none'
      }
    },
    [theme.breakpoints.down('md')]: {
      width: 26,
      minWidth: 26,
      height: 14,
      marginTop: 2
    }
  },
  maxVariant: {
    background: `${colors.invariant.green}cc !important`,
    '&:hover': {
      background: 'none',
      backgroundColor: `${colors.invariant.green} !important`,
      boxShadow: '0px 0px 20px -10px white',
      '@media (hover: none)': {
        background: 'rgba(46, 224, 154, 0.8)',
        boxShadow: 'none'
      }
    }
  },
  halfVariant: {
    background: `${colors.invariant.pink}cc !important`,
    '&:hover': {
      background: 'none',
      backgroundColor: `${colors.invariant.pink} !important`,
      boxShadow: '0px 0px 20px -10px white',
      '@media (hover: none)': {
        background: `${colors.invariant.pink}cc`,
        boxShadow: 'none'
      }
    }
  },
  actionButtonNotActive: {
    backgroundColor: colors.invariant.light,
    '&:hover': {
      backgroundColor: colors.invariant.light,
      cursor: 'default'
    }
  },
  select: {
    marginRight: 20,
    width: 'min-content'
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
    paddingBlock: 6,
    flexShrink: 1,
    marginRight: 10
  },
  showMaxButton: {
    cursor: 'pointer'
  },
  BalanceTypography: {
    color: colors.invariant.lightGrey,
    ...typography.caption2,
    marginRight: 6,
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
    flexWrap: 'nowrap',
    height: 65,
    padding: `10px 15px 0 15px `,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    color: colors.invariant.textGrey,
    ...typography.caption4,
    lineHeight: '24px',
    background: colors.black.full,
    borderRadius: 12
  },
  percentages: {
    alignItems: 'center',
    flexWrap: 'nowrap',
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
    textOverflow: 'ellipsis'
  },
  bottom: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingInline: 15
  },
  blur: {
    width: 120,
    height: 40,
    borderRadius: 16,
    background: `linear-gradient(90deg, ${colors.invariant.component} 25%, ${colors.invariant.light} 50%, ${colors.invariant.component} 75%)`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 2s infinite'
  }
}))
export default useStyles
