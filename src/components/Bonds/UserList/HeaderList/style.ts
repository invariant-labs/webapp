import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  containter: {
    display: 'grid',
    maxWidth: '918px',
    width: '100%',
    padding: '28px 0 28px 0',
    gridTemplateColumns: '20% 20% 20% 20% 20%',
    backgroundColor: colors.invariant.component,
    '& *': {
      whiteSpace: 'nowrap',
      ...typography.caption2,
      marginLeft: 'auto'
    }
  }
}))
