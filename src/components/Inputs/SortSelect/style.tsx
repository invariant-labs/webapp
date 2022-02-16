import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    ...newTypography.body2,
    backgroundColor: colors.invariant.component,
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 3,
    height: 28,
    width: 88,
    textAlign: 'center',
    position: 'relative',
    '&:hover': {
      backgroundColor: colors.invariant.light
    }
  },
  tokenName: {
    color: colors.white.main,
    overflow: 'hidden',
    position: 'relative',
    right: 6
  },
  endIcon: {
    color: colors.white.main,
    position: 'absolute',
    top: 4,
    right: 4
  }
}))

export default useStyles
