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
    paddingBottom: 9,
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

  HiddenTransactionButton: {
    background: 'none !important',
    border: 'none'
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
  tokenComponentTextContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative'
  },
  tokenComponentText: {
    color: colors.invariant.lightGrey,
    ...typography.label1,
    paddingLeft: 15
  },
  amountInput: {
    position: 'relative'
  },
  amountInputDown: {
    animation: '$slide-down .3s'
  },

  amountInputUp: {
    animation: '$slide-up .3s'
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
    transition: 'background-color 200ms'
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
    margin: '5px 0 7px 0px',
    position: 'relative',
    cursor: 'pointer',
    '& :hover , & :hover > p , & :hover > div ': {
      filter: 'brightness(1.2)'
    }
  },
  transactionDetailsWrapper: {
    backgroundColor: colors.invariant.light,
    marginTop: '10px',
    marginBottom: '10px',
    padding: '5px 15px 5px 15px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'center',
    '& :hover': {
      '& $transactionDetailsInfo': {
        opacity: 1
      }
    }
  },
  transactionDetailsHeader: {
    color: colors.invariant.lightGrey,
    ...typography.label1
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

  transactionBottom: {
    marginTop: 10
  },

  transtactionData: {
    border: `1px solid ${colors.invariant.light}`,
    borderRadius: '10px',
    padding: '5px 15px 5px 15px',

    color: colors.invariant.lightGrey
  }
}))

export default useStyles
