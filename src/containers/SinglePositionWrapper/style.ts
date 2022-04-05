import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  placeholderText: {
    ...typography.heading1,
    textAlign: 'center',
    color: colors.white.main
  },
  loading: {
    width: 200,
    height: 200,
    marginInline: 'auto'
  }
}))

export default useStyles
