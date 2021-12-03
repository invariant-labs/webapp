import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 65,
    marginInline: 'auto',
    width: 1004
  },
  back: {
    height: 24,
    marginBottom: 18,
    width: 'fit-content',
    transition: 'filter 300ms',

    '&:hover': {
      filter: 'brightness(2)'
    }
  },
  backIcon: {
    width: 22,
    height: 24,
    marginRight: 12
  },
  backText: {
    color: colors.invariant.lightInfoText,
    WebkitPaddingBefore: '2px',
    ...typography.body2
  },
  button: {
    color: colors.white.main,
    ...typography.body1,
    textTransform: 'none',
    background: colors.invariant.accent1,
    borderRadius: '10px',
    height: 40,

    '&:hover': {
      background: colors.invariant.accent1,
      boxShadow: `0 0 15px ${colors.invariant.accent1}`
    }
  },
  buttonText: {
    WebkitPaddingBefore: '2px'
  },
  top: {
    marginBottom: 16
  }
}))

export default useStyles
