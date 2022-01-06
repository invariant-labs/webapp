import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    ...typography.body2,
    backgroundColor: colors.invariant.componentOut2,
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 3,
    height: 28,
    width: 88,
    border: `1px solid ${colors.invariant.componentOut3}`,
    textAlign: 'center',
    position: 'relative',
    '&:hover': {
      backgroundColor: colors.invariant.componentOut2
    }
  },
  tokenName: {
    color: colors.invariant.componentOut3,
    overflow: 'hidden',
    position: 'relative',
    right: 6
  },
  endIcon: {
    color: colors.invariant.componentOut3,
    position: 'absolute',
    top: 2,
    right: 4
  }
}))

export default useStyles
