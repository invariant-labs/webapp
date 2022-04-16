import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    width: '100%',
    padding: '30px 0',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 134px',
    [theme.breakpoints.down('sm')]: {
      padding: '16px 0',
      gridTemplateColumns: '1fr 1fr 1fr 102px'
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr 1fr 70px'
    }
  },

  text: {
    textAlign: 'center',
    color: colors.invariant.textGrey,
    ...typography.caption2,
    [theme.breakpoints.down('sm')]: {
      ...typography.caption4
    }
  }
}))
