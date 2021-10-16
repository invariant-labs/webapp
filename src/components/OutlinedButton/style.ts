import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  general: {
    borderRadius: 10,
    textAlign: 'center',
    textTransform: 'none',
    ...typography.body1,
    transition: 'all 500ms ease',
    padding: '10px 19px',
    '&:hover': {
      opacity: 0.9
    }
  },
  disabled: {
    background: `${colors.navy.navButton} !important`,
    color: `${colors.navy.background} !important`
  },
  label: {
    position: 'relative',
    top: -2
  }
}))

export default useStyles
