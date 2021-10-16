import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 10,
    ...typography.body1,
    width: '100%',
    height: 50,
    backgroundColor: colors.invariant.yellowWeak,
    paddingInline: 0,

    '&:hover': {
      backgroundColor: colors.invariant.violetWeak
    }
  },
  icon: {
    minWidth: 36,
    height: 36
  },
  dualIcon: {
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content',
    marginRight: 6
  },
  secondIcon: {
    marginLeft: -15
  }
}))

export default useStyles
