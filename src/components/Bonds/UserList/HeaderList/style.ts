import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    width: '100%',
    padding: '28px 0',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 134px',
    color: colors.invariant.textGrey,

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr 80px'
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr 1fr 1fr 70px'
    }
  },
  text: {
    ...typography.caption2,
    margin: 'auto',
    textAlign: 'center',

    [theme.breakpoints.down('xs')]: {
      ...typography.caption4
    }
  }
}))
