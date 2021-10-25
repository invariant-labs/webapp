import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    width: '1100px'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '30px'
  },
  title: {
    ...newTypography.heading4,
    fontWeight: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    color: '#FFFFFF',
    ...newTypography.body1,
    textTransform: 'none',
    background: colors.invariant.accent1,
    borderRadius: '10px'
  }
}))
export default useStyles
