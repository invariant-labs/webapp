import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    maxWidth: '918px',
    width: '100%',
    padding: '32px 0 32px 0',
    alignItems: 'center',
    textAlign: 'center',
    gridTemplateColumns: '21% 25% 11% 19% 12% 12%',
    backgroundColor: colors.invariant.component,
    '& *': {
      whiteSpace: 'nowrap',
      ...typography.caption2
    }
  },

  vesting: {
    padding: '4.5px 0 4.5px 0',
    justifyContent: 'center',
    marginRight: 'auto'
  }
}))
