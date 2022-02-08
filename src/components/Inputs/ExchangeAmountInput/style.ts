import { colors } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  amountInput: {
    background: colors.invariant.newDark,
    color: colors.invariant.light,
    borderRadius: 20,
    padding: '5px 15px 0  8px ',
    fontSize: 30,
    fontWeight: 'bold',
    width: '100%',
    marginBottom: 16,
    transition: 'all .4s',
    '& ::placeholder': {
      textAlign: 'right'
    }
  },

  maxButton: {
    fontSize: 12,
    color: colors.invariant.componentIn2,
    minWidth: 30,
    height: 15,
    fontWeight: 400,
    borderRadius: 3,
    padding: '7px 0',
    backgroundColor: colors.invariant.light,
    background:
      'radial-gradient(118.38% 303.54% at 3.96% 118.38%, rgba(119, 72, 216, 0.1) 0%, rgba(119, 72, 216, 0) 100%), radial-gradient(57.34% 103.84% at 50% 0%, rgba(156, 231, 90, 0.1) 0%, rgba(156, 231, 90, 0) 100%)',
    '&:hover': {
      boxShadow: '0px 0px 20px -8px white'
    }
  },
  select: {
    marginRight: 20
  },
  input: {
    paddingTop: 4,
    '&:focus': {
      color: colors.white.main
    }
  },
  label: {
    top: -1
  },
  BalanceContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  BalanceTypography: {
    color: colors.invariant.lightGrey,
    fontSize: '12px',
    marginLeft: '10px',
    marginRight: '10px'
  },
  container: {
    marginRight: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  walletBalanace: {
    color: colors.invariant.lightGrey
  }
}))

export default useStyles
