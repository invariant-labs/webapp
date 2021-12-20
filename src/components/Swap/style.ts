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
  swapWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: '0 16px'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 500,
    position: 'relative',
    paddingBottom: 28,
    '& h1': {
      ...typography.heading4,
      color: colors.white.main
    }
  },
  settingsIcon: {
    width: 20,
    height: 20,
    cursor: 'pointer',
    transition: 'filter 100ms',

    '&:hover': {
      filter: 'brightness(1.5)'
    }
  },
  settingsIconBtn: {
    padding: 0,
    margin: 0,
    minWidth: 'auto'
  },
  slippage: {
    position: 'absolute'
  },
  root: {
    background: colors.invariant.componentOut4,
    borderRadius: 10,
    paddingInline: 24,
    paddingBottom: 22,
    paddingTop: 16,
    width: 500
  },
  tokenComponentTextContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative'
  },
  tokenComponentText: {
    color: colors.invariant.lightInfoText,
    ...typography.label1
  },
  amountInput: {
    position: 'relative',
    border: `1px solid ${colors.invariant.componentOut2}`,
    backgroundColor: colors.invariant.componentIn2
  },
  amountInputDown: {
    animation: '$slide-down .3s'
  },
  amountInputUp: {
    animation: '$slide-up .3s'
  },
  swapArrowBox: {
    backgroundColor: colors.invariant.componentOut2,
    width: 50,
    height: 50,
    borderRadius: '50%',
    position: 'absolute',
    zIndex: 2,
    left: '50%',
    top: '0%',
    transform: 'translateX(-50%) translateY(-40%)',
    cursor: 'pointer',
    transition: 'background-color 200ms',

    '&:hover': {
      backgroundColor: colors.invariant.componentOut3
    }
  },
  swapArrows: {
    width: 32,
    height: 24,
    marginBlock: 13,
    marginInline: 9,
    transition: '.4s all'
  },
  rateText: {
    color: colors.invariant.lightInfoText,
    textAlign: 'right',
    ...typography.label1
  },
  transactionDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    position: 'relative'
  },
  transactionDetailsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      '& $transactionDetailsInfo': {
        opacity: 1
      }
    }
  },
  transactionDetailsHeader: {
    color: colors.invariant.lightInfoText,
    ...typography.label1,
    cursor: 'pointer'
  },
  swapButton: {
    width: '100%',
    height: 48
  }
}))

export default useStyles
