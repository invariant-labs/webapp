import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  endIcon: {
    color: colors.invariant.componentOut3,
    position: 'absolute',
    right: 2,
    width: 20
  },
  input: {
    ...typography.body2,
    outline: 'none',
    height: 25,
    width: 88,
    backgroundColor: colors.invariant.componentOut2,
    color: colors.invariant.lightInfoText,
    borderRadius: 3,
    fontFamily: 'Mukta',
    cursor: 'pointer',
    lineHeight: 16,
    border: '1px solid #4D4757'
  }
}))

export default useStyles
