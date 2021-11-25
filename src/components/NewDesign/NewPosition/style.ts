import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  wrapper: {
    width: 882
  },
  title: {
    color: colors.white.main,
    ...newTypography.heading4,
    marginBottom: 18
  }
}))

export default useStyles
