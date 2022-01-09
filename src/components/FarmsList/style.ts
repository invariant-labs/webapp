import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 436,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  header: {
    paddingBottom: 10
  },
  title: {
    ...typography.heading4,
    color: colors.white.main
  },
  tile: {
    marginBottom: 20
  }
}))

export default useStyles
