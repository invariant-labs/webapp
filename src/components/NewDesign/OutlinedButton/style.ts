import { colors, newTypography } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  general: {
    borderRadius: 10,
    textAlign: 'center',
    textTransform: 'none',
    ...newTypography.body1,
    backgroundColor: colors.invariant.accent1,
    transition: 'all 500ms ease',
    padding: '10px 19px',
    '&:hover': {
      backgroundColor: colors.invariant.accent2
    }
  },
  disabled: {
    background: '#7748D8 !important',
    color: '#ffffff !important'
  }
}))

export default useStyles
