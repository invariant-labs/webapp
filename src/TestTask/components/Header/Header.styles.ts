import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles<Theme, { connected: boolean }>((theme: Theme) => ({
  root: {
    margin: 'auto',
    maxWidth: 1920,
    paddingInline: 150,
    height: 70,
    transition: 'all 150ms ease-out',

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
    height: 40,
    transition: 'all 150ms ease-out'
  },
  logoShort: {
    minWidth: 40,
    height: 30,
    marginRight: 8,
    transition: 'all 150ms ease-out',

    ['@media (max-width:378px)']: {
      transform: 'scale(0.75)'
    }
  },
  routers: {
    backgroundColor: colors.invariant.black,
    borderRadius: '10px',
    transition: 'all 150ms ease-out',
    width: 'fit-content'
  },
  connectedWalletIcon: {
    minWidth: 21,
    height: 21,
    marginRight: 0,
    transition: 'all 150ms ease-out',
    color: colors.invariant.green,
    '& >circle': {
      boxShadow: '0px 0px 10px rgba(157, 212, 109, 0.5)'
    }
  },
  buttons: ({ connected }) => ({
    justifyContent: 'flex-end',
    flex: '1 1 0%',
    marginLeft: 12,
    transition: 'all 150ms ease-out',

    [theme.breakpoints.only('lg')]: {
      minWidth: connected ? 420 : 350
    },

    [theme.breakpoints.only('md')]: {
      minWidth: 335
    },

    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      justifyContent: 'center'
    },

    ['@media (max-width:378px)']: {
      transform: 'scale(0.75)'
    }
  }),
  link: {
    textDecoration: 'none',
    minWidth: 'fit-content',
    transition: 'all 150ms ease-out'
  },
  menu: {
    width: 40,
    height: 25,
    transition: 'all 150ms ease-out'
  },
  menuButton: {
    borderRadius: 10,
    paddingInline: 6,
    paddingBlock: 1,
    height: 45,
    transition: 'all 150ms ease-out',
    marginLeft: 8,
    '&:hover': {
      background: 'transparent'
    },
    '&:hover $menu': {
      filter: 'brightness(2)'
    },
    ['@media (max-width:378px)']: {
      transform: 'scale(0.75)'
    }
  },
  leftSide: {
    flex: '1 1 0%'
  }
}))

export default useStyles
