import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  popover: {
    marginTop: 'calc(50vh - 350px)',
    marginLeft: 'calc(50vw - 231px)',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      marginLeft: 'auto',
      justifyContent: 'center'
    }
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none',
    maxWidth: 456
  },
  container: {
    display: 'grid',
    maxWidth: '464px',
    heightMax: '877px',
    width: '100%',
    backgroundColor: colors.invariant.component,
    borderRadius: '24px',
    justifyContent: 'center'
  },
  button: {
    textTransform: 'none',
    ...typography.body1,
    background: colors.invariant.pinkLinearGradient,
    borderRadius: '16px',
    height: '44px',
    margin: '26px 0 24px 0',
    color: colors.invariant.dark,

    '&:hover': {
      background: colors.invariant.pinkLinearGradient,
      opacity: '0.8'
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
  slippageButton: {
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
  },
  label: {},
  value: {},
  greenValue: {}
}))

export default useStyles
