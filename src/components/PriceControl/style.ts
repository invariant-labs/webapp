import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  wrapper: {
    backgroundColor: colors.invariant.violetGray,
    border: `1px solid ${colors.invariant.yellowStrong}`,
    padding: 20,
    borderRadius: 20
  },
  label: {
    color: colors.invariant.yellowStrong,
    ...typography.subtitle1
  },
  controls: {
    marginBlock: 20
  },
  button: {
    minWidth: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.invariant.violetWeak,
    ...typography.heading4,
    paddingTop: 2
  },
  value: {
    color: colors.invariant.yellowStrong,
    ...typography.heading2
  }
}))

export default useStyles
