import { makeStyles } from '@material-ui/core/styles'
import { colors, newTypography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingBottom: 25,
    width: '100%',
    height: '100%'
  },
  blur: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(12, 11, 13, 0.8)'
  },
  desc: {
    ...newTypography.body1,
    fontWeight: 500,
    lineHeight: '20px',
    color: colors.invariant.lightInfoText
  },
  button: {
    marginTop: 20,
    color: '#FFFFFF',
    background: colors.invariant.accent1,
    ...newTypography.body1
  }
}))

export default useStyles
