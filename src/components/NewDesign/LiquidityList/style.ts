import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    width: '970px'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '30px'
  },
  title: {
    color: colors.white.main,
    ...newTypography.heading4,
    fontWeight: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    color: colors.white.main,
    ...newTypography.body1,
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
  noPositionsText: {
    ...newTypography.heading1,
    textAlign: 'center',
    color: colors.white.main
  },
  list: {
    position: 'relative'
  }
}))
export default useStyles
