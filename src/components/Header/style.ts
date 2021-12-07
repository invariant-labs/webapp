import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 'auto',
    maxWidth: 1920,
    paddingInline: 150,
    height: 70,

    [theme.breakpoints.down('lg')]: {
      paddingInline: 103
    },

    [theme.breakpoints.down('md')]: {
      paddingInline: 24
    },

    [theme.breakpoints.down('xs')]: {
      paddingInline: 16
    }
  },
  logo: {
    minWidth: 150,
    height: 40
  },
  logoShort: {
    minWidth: 40,
    height: 30
  },
  routers: {
    background: 'radial-gradient(140% 140% at 50.43% 0%, #18161D 0%, rgba(24, 22, 29, 0) 100%)',
    borderRadius: '10px',
    transition: 'left 300ms'
  },
  connectedWalletIcon: {
    minWidth: 21,
    height: 21,
    marginRight: 0,
    color: colors.invariant.accent2,
    '& >circle': {
      boxShadow: '0px 0px 10px rgba(157, 212, 109, 0.5)'
    }
  },
  buttons: {
    justifyContent: 'flex-end'
  },
  link: {
    textDecoration: 'none'
  },
  menu: {
    width: 40,
    height: 25,
    transition: 'filter 300ms'
  },
  menuButton: {
    borderRadius: 10,
    padding: 6,
    paddingTop: 1,
    paddingBottom: 1,
    height: 45,
    transition: 'background 300ms',
    '&:hover': {
      background: colors.invariant.componentOut2
    },
    '&:hover $menu': {
      filter: 'brightness(2)'
    }
  }
}))

export default useStyles
