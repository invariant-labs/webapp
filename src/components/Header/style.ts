import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles<Theme, { connected: boolean }>((theme: Theme) => ({
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
    height: 30,
    marginRight: 8
  },
  routers: {
    borderRadius: '10px',
    transition: 'left 300ms',
    width: 'fit-content'
  },
  connectedWalletIcon: {
    minWidth: 21,
    height: 21,
    marginRight: 0,
    color: colors.invariant.green,
    '& >circle': {
      boxShadow: '0px 0px 10px rgba(157, 212, 109, 0.5)'
    }
  },
  buttons: ({ connected }) => ({
    justifyContent: 'flex-end',
    flex: '1 1 0%',
    marginLeft: 12,

    [theme.breakpoints.only('lg')]: {
      minWidth: connected ? 433 : 350
    },

    [theme.breakpoints.only('md')]: {
      minWidth: 350
    },

    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      justifyContent: 'center'
    }
  }),
  link: {
    textDecoration: 'none',
    minWidth: 'fit-content'
  },
  menu: {
    width: 40,
    height: 25,
    transition: 'filter 300ms'
  },
  menuButton: {
    borderRadius: 10,
    paddingInline: 6,
    paddingBlock: 1,
    height: 45,
    transition: 'background 300ms',
    marginLeft: 8,
    '&:hover': {
      background: colors.invariant.componentOut2
    },
    '&:hover $menu': {
      filter: 'brightness(2)'
    }
  },
  leftSide: {
    flex: '1 1 0%'
  }
}))

export default useStyles
