import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 10,
    ...typography.body1,
    minWidth: 164,
    height: 42,
    backgroundColor: colors.navy.navButton,
    paddingInline: 0
  },
  icon: {
    minWidth: 30,
    height: 30
  },
  startIcon: {
    marginRight: 6
  }
}))

export default useStyles
