import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  footer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerItem: {
    margin: '0 10px',
    opacity: '.5'
  }
}))

export default useStyles
