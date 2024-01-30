import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    height: 28,
    fontSize: 14,
    letterSpacing: '-0.3px',
    textAlign: 'center',
    textTransform: 'none',
    fontWeight: 400,
    backgroundColor: 'transparent',
    border: `1px solid ${colors.invariant.light}`,
    borderRadius: 8,
    color: colors.invariant.light,
    padding: '6px 12px',
    marginRight: 8,
    position: 'relative',
    overflow: 'hidden'
  }
}))

export default useStyles
