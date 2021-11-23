import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 65,
    width: '1100px'
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
    height: 40
  },
  buttonText: {
    WebkitPaddingBefore: '2px'
  }
}))
export default useStyles
