import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  footer: {
    width: '100%',
    position: 'fixed',
    bottom: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerItem: {
    margin: '0 10px',
    opacity: '.5',
    '&:hover': {
      opacity: 1
    }
  },
  footerLink: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  }
}))

export default useStyles
