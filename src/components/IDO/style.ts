import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: 882
  },
  title: {
    color: colors.white.main,
    ...typography.heading4,
    marginBottom: 18
  }
}))

export default useStyles
