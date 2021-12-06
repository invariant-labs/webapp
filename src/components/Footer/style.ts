import { colors, typography } from '@static/theme'
import { makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    width: '100%',
    position: 'fixed',
    bottom: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      position: 'unset',
      paddingTop: 40
    }
  },
  footerItem: {
    margin: '0 10px',
    opacity: '.5',
    transition: '.2s all',
    '&:hover': {
      opacity: 1,
      transform: 'scale(1.1) rotate(10deg)'
    }
  },
  footerLink: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  }
}))

export default useStyles
