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
    color: colors.invariant.lightInfoText,
    border: `1px solid ${colors.invariant.componentOut3}`,
    position: 'relative',
    '&:hover ': {
      backgroundColor: colors.invariant.componentOut2
    }
  },
  endIcon: {
    color: colors.invariant.componentOut3,
    position: 'absolute',
    top: 2,
    right: 4
  },
  input: {
    ...typography.body2,
    outline: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    width: 55,
    position: 'absolute',
    left: 4,
    color: colors.invariant.lightInfoText,
    height: 16,
    fontFamily: 'Mukta',
    cursor: 'pointer',
    '&::placeholder': {
      ...typography.body2,
      color: colors.invariant.lightInfoText
    }
  }
}))

export default useStyles
