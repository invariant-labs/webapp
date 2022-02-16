import { colors, newTypography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  amountInput: {
    background: colors.invariant.newDark,
    color: colors.invariant.light,
    borderRadius: 20,
    ...newTypography.heading2,
    width: '100%',
    textAlign: 'right',
    transition: 'all .4s',
    '& ::placeholder': {
      textAlign: 'right'
    }
  },
  maxButton: {
    ...newTypography.caption4,
    minWidth: 30,
    height: 15,
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
    textAlign: 'right',
    color: colors.white.main,
    '& ::placeholder': {
      textAlign: 'right'
    }
  },
  label: {
    top: -1,
    color: colors.invariant.dark
  },
  BalanceContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  BalanceTypography: {
    cursor: 'default !important',
    color: colors.invariant.lightGrey,
    ...newTypography.caption3,
    paddingLeft: 15,
    marginRight: 3
  },
  container: {
    paddingRight: 15,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    filter: 'brightness(0.8)',

    '& :hover > button , & :hover > p': {
      filter: 'brightness(1.1)'
    }
  },
  walletBalanace: {
    color: colors.invariant.lightGrey
  },
  exchangeContainer: {
    padding: '10px 15px 0  15px ',
    display: 'flex'
  },
  noData: {
    color: colors.invariant.warning,
    ...newTypography.caption2,
    display: 'grid',
    gap: 5.45,
    gridAutoFlow: 'column',
    cursor: 'default',
    paddingBottom: 10
  },
  noDataIcon: {
    height: 9.5,
    width: 9.5,
    border: '1px solid #EFD063',
    color: colors.invariant.warning,
    borderRadius: '50%',
    fontSize: 8,
    lineHeight: '10px',
    fontWeight: 400,
    textAlign: 'center',
    alignSelf: 'center',
    cursor: 'default'
  }
}))

export default useStyles
