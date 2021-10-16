import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  wrapper: {
    backgroundColor: colors.invariant.violetGray,
    border: `1px solid ${colors.invariant.yellowWeak}`,
    padding: 20,
    borderRadius: 20,
    width: 700
  },
  title: {
    color: colors.invariant.yellowStrong,
    ...typography.heading4
  },
  current: {
    color: colors.invariant.yellowStrong,
    ...typography.subtitle2
  },
  plot: {
    width: 600,
    height: '300px !important',
    backgroundColor: colors.invariant.violetGray,
    border: '1px solid black',
    borderColor: colors.invariant.yellowWeak
  },
  controls: {
    marginBlock: 20
  },
  control: {
    width: 300,
    maxHeight: 300
  },
  fullRange: {
    width: '100%',
    height: 60,
    borderRadius: 20,
    backgroundColor: colors.invariant.yellowWeak,
    ...typography.heading4,
    paddingTop: 2,
    textTransform: 'none'
  }
}))

export default useStyles
