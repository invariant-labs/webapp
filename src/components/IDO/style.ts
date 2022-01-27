import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    maxWidth: 664,
    padding: 16,
    [theme.breakpoints.down('xs')]: {
      padding: 50
    }
  },
  row: {
    position: 'relative',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  title: {
    color: colors.white.main,
    ...typography.heading4,
    marginBottom: 18
  },
  deposit: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: 24,
      marginRight: 0
    }
  }
}))

export default useStyles
