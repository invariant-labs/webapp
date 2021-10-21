import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: '0 150px',
    height: 70,
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      padding: '0 100px'
    },
    [theme.breakpoints.down('sm')]: {
      height: 54,
      padding: '0 75px'
    }
  },
  logo: {
    minWidth: 50,
    height: 50
  },
  logoName: {
    color: colors.white.main,
    ...typography.body1,
    minWidth: 'min-content',
    marginRight: 8
  },

  routers: {
    background: 'radial-gradient(140% 140% at 50.43% 0%, #18161D 0%, rgba(24, 22, 29, 0) 100%)',
    borderRadius: '10px'
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
    display: 'flex',
    flexDirection: 'row'
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
    textDecoration: 'none'
  },
  verticalDivider: {
    background: colors.invariant.violetWeak,
    height: 50,
    marginInline: 25,

    [theme.breakpoints.down('sm')]: {
      height: 36,
      margin: 0
    }
  }
}))

export default useStyles
