import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    width: 436
  },
  header: {
    paddingBottom: 10
  },
  title: {
    ...newTypography.heading4,
    color: colors.white.main
  },
  tile: {
    marginBottom: 20
  }
}))

export default useStyles
