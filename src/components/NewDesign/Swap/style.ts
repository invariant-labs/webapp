import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 500,
    position: 'relative',
    paddingBottom: 28,
    '& h1': {
      ...newTypography.heading4,
      color: colors.white.main
    }
  },
  settingsIcon: {
    width: 20,
    height: 20,
    cursor: 'pointer'
  },
  slippage: {
    position: 'absolute'
  },
  root: {
    background: colors.invariant.componentOut4,
    borderRadius: 10,
    padding: '22px 24px',
    width: 500
  },
  tokenComponentTextContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative'
  },
  tokenComponentText: {
    color: colors.invariant.lightInfoText,
    ...newTypography.label1
  },
  amountInput: {
    border: `1px solid ${colors.invariant.componentOut2}`,
    backgroundColor: colors.invariant.componentIn2
  },
  swapArrowBox: {
    backgroundColor: colors.invariant.componentOut2,
    padding: '10px 10px',
    width: 'max-content',
    borderRadius: '100%',
    position: 'absolute',
    zIndex: 2,
    left: '50%',
    top: '0%',
    transform: 'translateX(-50%) translateY(-40%)',
    cursor: 'pointer'
  },
  swapArrows: {
    width: 42,
    height: 28,
    margin: 4,
    transition: '.4s all'
  },
  rateText: {
    color: colors.invariant.lightInfoText,
    textAlign: 'right',
    ...newTypography.label1
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
    ...newTypography.label1,
    cursor: 'pointer'
  },
  swapButton: {
    width: '100%',
    height: 48,
    ...newTypography.body1,
    color: colors.white.main,
    cursor: 'pointer'
  }
}))

export default useStyles
