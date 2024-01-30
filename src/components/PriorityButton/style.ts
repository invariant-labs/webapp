import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    height: 44,
    borderRadius: 16,
    textAlign: 'center',
    textTransform: 'none',
    ...typography.body1,
    color: colors.invariant.componentBcg,
    background: colors.invariant.pinkLinearGradient,
    transition: 'background-color 0ms ease, box-shadow 150ms linear',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 4,
    '&:disabled': {
      background: colors.invariant.light,
      color: colors.invariant.componentBcg
    }
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    padding: 0,
    zIndex: 1,
    top: 0,
    left: '-100%',
    backgroundColor: colors.invariant.pink
  },
  buttonContent: {
    position: 'relative',
    zIndex: 4
  },
  btnStories: {
    padding: '8px 14px',
    backgroundColor: colors.invariant.green,
    border: 'none',
    margin: '10px 14px 10px 0'
  }
}))

export default useStyles
