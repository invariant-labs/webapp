import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  wrapper: {
    backgroundColor: colors.invariant.violetGray,
    border: `1px solid ${colors.invariant.yellowWeak}`,
    padding: 20,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content'
  },
  left: {
    border: `1px solid ${colors.invariant.yellowStrong}`,
    padding: 20,
    borderRadius: 20,
    width: 700,
    marginRight: 20
  },
  heading: {
    color: colors.invariant.yellowStrong,
    ...typography.heading4
  },
  selects: {
    color: colors.invariant.violetStrong,
    ...typography.subtitle2,
    marginTop: 16
  },
  feeContainer: {
    marginBlock: 32
  },
  feeText: {
    color: colors.invariant.yellowStrong,
    ...typography.heading4
  },
  feeDesc: {
    color: colors.invariant.yellowStrong,
    ...typography.subtitle2
  },
  addPosition: {
    width: '100%',
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.invariant.yellowStrong,
    color: colors.invariant.violetWeak,
    ...typography.heading2,
    paddingTop: 2,
    textTransform: 'none'
  },
  inputPlaceholder: {
    height: 60,
    backgroundColor: colors.invariant.yellowGray,
    color: colors.invariant.violetWeak,
    borderRadius: 10
  },
  inputPlaceholderText: {
    ...typography.subtitle2
  },
  warning: {
    backgroundColor: colors.invariant.violetGray,
    color: colors.yellow.neon,
    borderRadius: 10,
    border: `1px solid ${colors.yellow.neon}`,
    padding: 16
  },
  warningText: {
    ...typography.subtitle2
  }
}))

export default useStyles
