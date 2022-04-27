import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    width: 436
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
  },

  noConnected: {
    position: 'relative'
  },
  empty: {
    marginBlock: 20
  }
}))

export default useStyles
