import { makeStyles } from '@material-ui/core'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    maxWidth: '464px',
    heightMax: '877px',
    width: '100%',
    backgroundColor: colors.invariant.component,
    borderRadius: '24px',
    justifyContent: 'center'
  },
  button: {
    textTransform: 'none',
    ...typography.body1,
    background: colors.invariant.pinkLinearGradient,
    borderRadius: '16px',
    height: '44px',
    margin: '26px 0 24px 0',
    color: colors.invariant.dark,

    '&:hover': {
      background: colors.invariant.pinkLinearGradient,
      opacity: '0.8'
    }
  }
}))

export default useStyles
