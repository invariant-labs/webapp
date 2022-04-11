import { makeStyles } from '@material-ui/core'
import { colors } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    margin: '0',
    boxSizing: 'border-box',
    maxWidth: '918px',
    width: '100%',
    borderRadius: '24px',
    padding: '0 32px 10px 32px',
    overflow: 'hidden',
    backgroundColor: colors.invariant.component,

    [theme.breakpoints.down('xs')]: {
      padding: '0 16px 10px 16px'
    }
  }
}))
