import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  endIcon: {
    color: colors.invariant.light,
    position: 'absolute',
    right: 12,
    width: 20
  },
  input: {
    boxSizing: 'border-box',
    ...typography.body2,
    outline: 'none',
    width: 88,
    height: 28,
    fontFamily: 'Mukta',
    lineHeight: 16,
    fontSize: 16,
    backgroundColor: colors.invariant.black,
    color: colors.invariant.light,
    border: `1px solid ${colors.invariant.light}`,
    borderRadius: 8,
    cursor: 'pointer',
    '&::placeholder': {
      color: colors.invariant.light
    }
  }
}))

export default useStyles
