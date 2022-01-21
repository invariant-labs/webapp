import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes slide-down': {
    '0%': {
      top: 0
    },
    '50%': {
      top: 60
    },
    '100%': {
      top: 0
    }
  },
  '@keyframes slide-up': {
    '0%': {
      top: 0
    },
    '50%': {
      top: -60
    },
    '100%': {
      top: 0
    }
  },
  idoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: '0 16px'
    }
  },
  header: {
    width: 408,
    paddingBottom: 36,
    '& h1': {
      ...typography.heading4,
      color: colors.white.main,
      height: 12
    },
    [theme.breakpoints.down('sm')]: {
      width: 336
    }
  },
  main: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24
    }
  },
  root: {
    background: colors.invariant.componentOut4,
    borderRadius: 10,
    paddingInline: 24,
    paddingBottom: 22,
    paddingTop: 16,
    width: 408,
    [theme.breakpoints.down('sm')]: {
      width: 336
    }
  },
  tokenComponentTextContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  tokenComponentText: {
    color: colors.invariant.lightInfoText,
    ...typography.body3
  },
  depositedAmountContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  depositedAmounts: {
    marginTop: '8px',
    display: 'flex'
  },
  depositedAmountTextContainer: {
    marginLeft: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '72%'
  },
  depositedAmountSecondaryTextContainer: {
    display: 'flex',
    height: '8px',
    justifyContent: 'space-between'
  },
  depositedAmountMainText: {
    ...typography.heading4,
    color: colors.white.main,
    height: '12px',
    lineHeight: '12px'
  },
  depositedAmountSecondaryText: {
    ...typography.label1,
    color: colors.invariant.lightInfoText,
    lineHeight: '8px',
    [theme.breakpoints.down('sm')]: {
      ...typography.label3
    }
  },
  connectWalletButton: {
    marginTop: 36,
    height: 40,
    borderRadius: 5,
    textAlign: 'center',
    textTransform: 'none',
    ...typography.body1,
    backgroundColor: colors.invariant.accent1,
    color: colors.white.main,
    transition: 'background-color 0ms ease, box-shadow 150ms linear'
  },
  amountInput: {
    position: 'relative',
    border: `1px solid ${colors.invariant.componentOut2}`,
    backgroundColor: colors.invariant.componentIn2
  },
  amountInputDown: {
    animation: '$slide-down .3s'
  },
  label: {
    fontSize: '25px',
    fontWeight: 600,
    lineHeight: '40px',
    height: '15px',
    marginBottom: '40px',
    color: colors.white.main
  },
  statsContainer: {
    color: 'white',
    width: 240,
    marginLeft: 16,
    [theme.breakpoints.down('sm')]: {
      width: 216
    },
    [theme.breakpoints.down('xs')]: {
      width: 336,
      marginLeft: 0
    }
  },
  statsList: {
    padding: 0
  },
  statsListItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '&:nth-child(odd)': {
      background: colors.invariant.componentOut4,
      '&:hover': { background: colors.invariant.componentOut2 }
    },
    '&:nth-child(even)': {
      background: colors.invariant.componentIn2,
      '&:hover': { background: colors.invariant.componentOut1 }
    },
    '&:first-child': { borderRadius: '10px 10px 0 0' },
    '&:last-child': { borderRadius: '0 0 10px 10px' }
  },
  timeIcon: {
    fontSize: 22,
    height: '22px'
  },
  icon: {
    height: '22px'
  },
  logo: {
    minWidth: 28,
    height: 33
  },
  odd: {
    background: 'blue'
  }
}))

export default useStyles
