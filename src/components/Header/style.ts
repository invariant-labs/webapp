import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.invariant.violetGray,
    paddingRight: 0,
    height: 74,

    [theme.breakpoints.down('sm')]: {
      height: 54
    }
  },
  logo: {
    width: 80,
    height: 80,
    marginLeft: 15,

    [theme.breakpoints.down('sm')]: {
      width: 60,
      height: 60,
      marginInline: 5
    }
  },
  divider: {
    background: colors.invariant.violetWeak
  },
  verticalDivider: {
    background: colors.invariant.violetWeak,
    height: 50,
    marginInline: 25,

    [theme.breakpoints.down('sm')]: {
      height: 36,
      margin: 0
    }
  },
  connectedWalletIcon: {
    minWidth: 21,
    height: 21,
    marginRight: 0
  },
  dehazeButton: {
    borderRadius: 10,
    padding: 4,
    paddingTop: 1,
    paddingBottom: 1,
    marginLeft: 5,

    '&:hover': {
      background: colors.invariant.violetGray
    }
  },
  dehazeIcon: {
    width: 45,
    height: 'auto',
    fill: colors.invariant.violetWeak
  },
  dotsButton: {
    borderRadius: 10,
    padding: '0px 2px',
    marginRight: 25,

    '&:hover': {
      background: colors.invariant.violetStrong
    },

    '& $dehazeIcon': {
      fill: colors.invariant.violetStrong
    }
  },
  left: {
    maxWidth: 121,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 66
    }
  },
  right: {
    maxWidth: 125
  },
  mobileRight: {
    maxWidth: 66
  },
  buttons: {
    justifyContent: 'flex-end',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-evenly'
    }
  },
  link: {
    textDecoration: 'none',

    '&:not(:last-child)': {
      marginRight: 15
    }
  }
}))

export default useStyles
