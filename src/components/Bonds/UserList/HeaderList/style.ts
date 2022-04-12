import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    maxWidth: '918px',
    width: '100%',
    padding: '28px 0 28px 0',
    gridTemplateColumns: '23% 23% 19% 19% 16%',
    backgroundColor: colors.invariant.component,
    color: colors.invariant.textGrey,

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '29% 25% 25% 21%'
    },
    '& *': {
      ...typography.caption2,
      maxWidth: '918px',
      margin: 'auto',

      [theme.breakpoints.down('xs')]: {
        ...typography.caption4
      }
    }
  }
}))
