import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  '@keyframes slide-down': {
    '0%': {
      transform: 'translateY(0%)'
    },
    '50%': {
      transform: 'translateY(60%)'
    },
    '100%': {
      transform: 'translateY(0%)'
    }
  },
  '@keyframes slide-up': {
    '0%': {
      transform: 'translateY(0%)'
    },
    '50%': {
      transform: 'translateY(-70%)'
    },
    '100%': {
      transform: 'translateY(0%)'
    }
  },

  '@keyframes slide-down-xs': {
    '0%': {
      transform: 'translateY(0%)'
    },
    '50%': {
      transform: 'translateY(90%)'
    },
    '100%': {
      transform: 'translateY(0%)'
    }
  },
  '@keyframes slide-up-xs': {
    '0%': {
      transform: 'translateY(0%)'
    },
    '50%': {
      transform: 'translateY(-110%)'
    },
    '100%': {
      transform: 'translateY(0%)'
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
    paddingBottom: 9,
    '& h1': {
      ...typography.heading4,
      color: colors.white.main
    }
  },
  refreshIcon: {
    width: 26,
    height: 21,
    cursor: 'pointer',
    transition: 'filter 100ms',
    '&:hover': {
      filter: 'brightness(1.5)'
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
  HiddenTransactionButton: {
    background: 'none !important',
    border: 'none',
    minWidth: 'auto',
    color: colors.invariant.lightHover,
    '&:hover': {
      filter: 'brightness(1.15)',
      cursor: 'pointer'
    }
  },

  transactionDetailDisabled: {
    background: 'none !important',
    border: 'none',
    minWidth: 'auto',
    color: colors.invariant.lightHover
  },

  swapControls: {
    display: 'flex',
    gap: 8
  },

  refreshIconBtn: {
    padding: 0,
    margin: 0,
    minWidth: 'auto',
    background: 'none',
    '& :hover': {
      background: 'none'
    }
  },
  settingsIconBtn: {
    padding: 0,
    margin: 0,
    minWidth: 'auto',
    background: 'none',
    '& :hover': {
      background: 'none'
    }
  },
  slippage: {
    position: 'absolute'
  },
  root: {
    background: colors.invariant.component,
    borderRadius: 24,
    paddingInline: 24,
    paddingBottom: 22,
    paddingTop: 16,
    width: 500
  },

  connectWalletButton: {
    height: '48px !important',
    borderRadius: '16px !important',
    width: '100%',

    [theme.breakpoints.down('xs')]: {
      width: '100% !important'
    }
  },
  tokenComponentTextContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative'
  },
  amountInput: {
    position: 'relative'
  },
  amountInputDown: {
    animation: '$slide-down 300ms linear',

    [theme.breakpoints.down('xs')]: {
      animation: '$slide-down-xs 300ms linear'
    }
  },

  amountInputUp: {
    animation: '$slide-up 300ms linear',

    [theme.breakpoints.down('xs')]: {
      animation: '$slide-up-xs 300ms linear'
    }
  },

  swapArrowBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.invariant.component,
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

    [theme.breakpoints.down('xs')]: {
      transform: 'translateX(-50%) translateY(-14%)'
    }
  },
  swapImgRoot: {
    background: colors.invariant.newDark,
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    '&:hover': {
      backgroundColor: colors.invariant.light
    }
  },

  swapArrows: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    marginBlock: 13,
    marginInline: 6,
    transition: '.4s all'
  },

  transactionDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexFlow: 'row nowrap',
    marginTop: 5,
    position: 'relative',
    cursor: 'default',
    filter: 'brightness(0.9)'
  },
  transactionDetailsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.invariant.light,
    margin: '16px 0 ',
    paddingInline: 15,
    borderRadius: '10px',
    alignItems: 'center',
    height: 32
  },

  transactionDetailsHeader: {
    ...typography.caption2,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',

    [theme.breakpoints.down('xs')]: {
      ...typography.tiny2
    }
  },

  swapButton: {
    width: '100%',
    height: 48
  },

  exchangeRoot: {
    position: 'relative',
    background: colors.invariant.newDark,
    borderRadius: 20
  },
  transactionTop: {
    marginTop: 10
  },

  hideBalance: {
    padding: '5px 15px 5px 15px'
  },

  transactionBottom: {
    marginTop: 10,

    [theme.breakpoints.down('xs')]: {
      marginTop: 36
    }
  },

  transtactionData: {
    border: `1px solid ${colors.invariant.light}`,
    borderRadius: '10px',
    padding: '5px 15px 5px 15px',
    color: colors.invariant.lightGrey
  },

  buttonSelectDisabled: {
    background: `${colors.invariant.pinkLinearGradient} !important`,

    '&:hover': {
      filter: 'brightness(1.15)',
      boxShadow:
        '0px 3px 1px -2px rgba(43, 193, 144, 0.2),0px 1px 2px 0px rgba(45, 168, 128, 0.14),0px 0px 5px 7px rgba(59, 183, 142, 0.12)'
    }
  },
  ButtonSwapActive: {
    transition: 'filter 0.3s linear',
    background: `${colors.invariant.greenLinearGradient} !important`,
    filter: 'brightness(0.8)',
    '&:hover': {
      filter: 'brightness(1.15)',
      boxShadow:
        '0px 3px 1px -2px rgba(43, 193, 144, 0.2),0px 1px 2px 0px rgba(45, 168, 128, 0.14),0px 0px 5px 7px rgba(59, 183, 142, 0.12)'
    }
  },
  infoIcon: {
    width: 10,
    height: 10,
    marginLeft: 4,
    marginBottom: 2,
    filter: 'brightness(0.8)',
    pointerEvents: 'none'
  }
}))

export default useStyles
