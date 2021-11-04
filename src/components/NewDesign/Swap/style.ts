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
      color: '#FFFFFF'
    }
  },
  settingsIcon: {
    width: 20,
    height: 20
  },
  slippage: {
    position: 'absolute',
    right: -310,
    top: 10
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
    border: '1px solid #34303B',
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
  transactionDetailsInfo: {
    position: 'absolute',
    top: 5,
    right: 85,
    opacity: 0,
    zIndex: 3,
    transition: 'all .4s',
    backgroundColor: colors.invariant.componentIn2,
    width: 250,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    color: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 5,
    '& p': {
      ...newTypography.body1
    }
  },
  detailsInfoWrapper: {
    height: 'auto',
    '& h2': {
      ...newTypography.body1
    },
    '& p': {
      ...newTypography.body3
    },
    '& span': {
      ...newTypography.label1,
      color: colors.invariant.lightInfoText
    }
  },
  swapButton: {
    width: '100%',
    height: 48,
    ...newTypography.body1,
    color: '#ffffff',
    cursor: 'pointer'
  }
}))

export default useStyles
