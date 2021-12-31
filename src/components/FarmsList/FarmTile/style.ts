import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 10,
    backgroundColor: colors.invariant.componentOut1,
    padding: 24
  },
  top: {},
  icon: {},
  names: {},
  dot: {},
  greenDot: {},
  greyDot: {},
  greenText: {},
  greyText: {},
  activity: {},
  infoRow: {},
  label: {},
  value: {},
  link: {},
  button: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    textTransform: 'none',
    ...typography.body1,
    backgroundColor: colors.invariant.accent1,
    color: colors.white.main,

    '&:hover': {
      backgroundColor: `${colors.invariant.accent1}`,
      boxShadow: `0px 0px 15px ${colors.invariant.accent1}`
    },

    '&:disabled': {
      backgroundColor: colors.invariant.componentOut3,
      color: colors.invariant.background2
    }
  }
}))

export default useStyles
