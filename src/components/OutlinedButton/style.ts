import { colors, typography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  general: {
    marginLeft: 5,
    cursor: 'default !important',
    minWidth: 30,
    height: 15,
    borderRadius: 3,
    textAlign: 'center',
    textTransform: 'none',
    ...typography.body1,
    backgroundColor: `${colors.invariant.green} !important`,
    padding: '10px 14px',
    '&:hover': {
      backgroundColor: colors.invariant.green
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
