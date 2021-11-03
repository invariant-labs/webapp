import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
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
    marginTop: 16,
    textAlign: 'right',
    ...newTypography.subtitle1
  },
  transactionDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    marginBottom: 8,
    cursor: 'pointer'
  },
  transactionDetailsHeader: {
    color: colors.invariant.lightInfoText,
    ...newTypography.label1,
    cursor: 'pointer'
  },
  transactionDetailsInfo: {
    maxHeight: 300,
    transition: 'all .4s',
    backgroundColor: colors.invariant.componentIn2,
    width: '100%',
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
    height: 'auto'
  },
  detailsInfoForm: {
    border: '1px solid #34303B',
    color: '#FFFFFF',
    borderRadius: 5,
    backgroundColor: '#141216',
    padding: '8px 8px',
    marginTop: '8px',
    '&::placeholder': {
      color: colors.invariant.lightInfoText
    },
    '&:focus': {
      outline: 'none'
    }
  },
  detailsInfoBtn: {
    backgroundColor: colors.invariant.accent2,
    borderRadius: 5,
    border: 'none',
    padding: '8px 10px',
    marginLeft: -25
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
