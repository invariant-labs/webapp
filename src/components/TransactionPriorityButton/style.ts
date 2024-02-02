import { makeStyles } from '@material-ui/core'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    height: 51,
    fontSize: 14,
    letterSpacing: '-0.3px',
    textTransform: 'none',
    fontWeight: 400,
    background: colors.invariant.newDark,
    borderRadius: 16,
    padding: '32px 16px',
    margin: '0 0 4px 0px',
    color: colors.invariant.lightGrey,
    overflow: 'hidden',
    '&:hover': {
      color: colors.invariant.lightGrey
    }
  },
  selectedButton: {
    height: 51,
    fontSize: 14,
    letterSpacing: '-0.3px',
    textTransform: 'none',
    fontWeight: 400,
    background: colors.invariant.light,
    borderRadius: 16,
    padding: '32px 16px',
    margin: '0 0 4px 0px',
    color: colors.invariant.text,
    overflow: 'hidden',
    '&:hover': {
      color: colors.invariant.text
    }
  },
  marketFee: {
    fontFamily: 'Mukta',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: '-0.03px',
    backgroundColor: 'inherit',
    color: 'inherit'
  },
  wrapper: {
    width: 280,
    textAlign: 'left',
    flexDirection: 'column',
    padding: '16 0'
  },
  maxFee: {
    fontSize: 16,
    background: colors.invariant.newDark,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.03px',
    marginLeft: 6,
    backgroundColor: 'inherit'
  },
  maxFeeColored: {
    color: `${colors.invariant.pink} !important`
  },
  label: {
    fontFamily: 'Mukta',
    backgroundColor: 'inherit',
    color: 'inherit',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: '20px',
    letterSpacing: '-0.03px'
  }
}))

export default useStyles
