import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: 882
  },
  row: {
    position: 'relative',
    flexDirection: 'row',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  title: {
    color: colors.white.main,
    ...typography.heading4,
    marginBottom: 18
  },
  deposit: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 24,
      marginRight: 0
    }
  }
}))

export default useStyles
