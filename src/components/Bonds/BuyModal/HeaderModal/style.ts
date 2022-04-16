import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    boxSizing: 'border-box',
    maxWidth: '464px',
    width: '100%',
    background: colors.invariant.component,
    color: colors.white.main,
    borderRadius: '24px',
    '& > *': {
      display: 'flex',
      margin: 'auto',
      ...typography.heading1,
      fontFamily: 'Mukta',
      alignItems: 'center'
    },
    '& p': {
      color: colors.invariant.textGrey,
      ...typography.body2
    }
  },
  buy: {
    padding: '26px 0 26px 0'
  },
  token: {
    paddingBottom: '16px'
  },
  icon: {
    width: '44px',
    height: '44px',
    borderRadius: '100%',
    marginRight: '12px'
  },
  price: {
    padding: '35px 0 10px 0'
  },
  pricePercent: {
    display: 'flex',
    marginLeft: '12px',
    padding: '4px',
    borderRadius: '5px',
    ...typography.caption1,
    background: 'rgba(251, 85, 95, 0.2)',
    color: 'rgba(251, 85, 95)'
  },
  value: {
    padding: '35px 0 10px 0'
  },
  slippage: {
    padding: '35px 0 10px 0'
  },
  mainInput: {
    position: 'relative'
  },
  input: {
    border: '0',
    width: '396px',
    padding: '10px',
    color: colors.white.main,
    ...typography.heading3,
    maxWidth: '416px',
    backgroundColor: colors.invariant.newDark,
    borderRadius: '11px',

    '&:focus': {
      outline: 'none'
    }
  },
  button: {
    position: 'absolute',
    ...typography.body2,
    color: colors.invariant.black,
    right: '5px',
    borderRadius: '9px',
    textTransform: 'none',
    background: colors.invariant.greenLinearGradient,
    width: '58px',
    height: '32px',

    '&:hover': {
      color: colors.invariant.greenLinearGradient,
      opacity: '0.8'
    }
  },
  vesting: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '50% 50%',
    padding: '35px 0 10px 0',
    textAlign: 'center'
  },
  roi: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '50% 50%',
    ...typography.heading1,
    color: colors.invariant.green,
    textAlign: 'center'
  }
}))

export default useStyles
