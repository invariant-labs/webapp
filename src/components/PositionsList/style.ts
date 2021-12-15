import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 1200,

    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  header: {
    paddingBottom: 30
  },
  title: {
    color: colors.white.main,
    ...typography.heading4,
    fontWeight: 500
  },
  button: {
    color: colors.white.main,
    ...typography.body1,
    textTransform: 'none',
    background: colors.invariant.accent1,
    borderRadius: 10,
    height: 40,
    width: 130,
    paddingInline: 0,

    '&:hover': {
      background: colors.invariant.accent1,
      boxShadow: `0 0 15px ${colors.invariant.accent1}`
    }
  },
  buttonText: {
    WebkitPaddingBefore: '2px'
  },
  noPositionsText: {
    ...typography.heading1,
    textAlign: 'center',
    color: colors.white.main
  },
  list: {
    position: 'relative'
  }
}))

export default useStyles
