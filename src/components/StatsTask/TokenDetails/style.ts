import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 24,
    backgroundColor: colors.invariant.dark,
    padding: 24,
    paddingTop: 16,
    [theme.breakpoints.down('xs')]: {
      padding: 16
    }
  },
  label: {
    color: colors.invariant.lightGrey,
    ...typography.caption2,
    fontWeight: 400,
    letterSpacing: '-0.03em'
  },
  value: {
    color: colors.white.main,
    ...typography.caption1
  },
  mobileContainer: {
    padding: '10px 0 10px 0',
    fontFamily: 'Mukta'
  },
  spacer: {
    paddingTop: 20
  }
}))

export default useStyles
