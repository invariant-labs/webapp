import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  general: {
    minWidth: 30,
    height: 15,
    borderRadius: 3,
    textAlign: 'center',
    textTransform: 'none',
    ...typography.body1,
    // backgroundColor: colors.invariant.accent1,
    background: colors.invariant.green,

    padding: '10px 14px',
    '&:hover': {
      backgroundColor: colors.invariant.accent2
    }
  },
  disabled: {
    minWidth: 30,
    height: 15,
    background: `${colors.invariant.light} !important`,
    color: `${colors.invariant.background2} !important`
  }
}))

export default useStyles
