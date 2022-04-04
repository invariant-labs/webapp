import { makeStyles } from '@material-ui/core'
import { colors } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    margin: '0',
    display: 'grid',
    boxSizing: 'border-box',
    maxWidth: '918px',
    width: '100%',
    borderRadius: '24px',
    padding: '0 32px 0 32px',
    overflow: 'hidden',
    backgroundColor: colors.invariant.component
  }
}))
