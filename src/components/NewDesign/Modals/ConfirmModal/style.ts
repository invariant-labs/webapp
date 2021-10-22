import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  modal: {
    height: '100vh'
  },
  root: {
    background: '#1B191F',
    width: 340,
    borderRadius: 10,
    margin: '10% auto ',
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    color: colors.white.main,
    ...typography.subtitle2
  },
  desc: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 400,
    color: '#746E7C',
    textAlign: 'center',
    padding: 12
  },
  buttons: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 17
  },
  buttonCancel: {
    backgroundColor: '#746E7C',
    width: 120,
    ...typography.subtitle2,
    textTransform: 'capitalize'
  },
  buttonClaim: {
    backgroundColor: '#9DD46D',
    width: 120,
    ...typography.subtitle2,
    textTransform: 'capitalize'
  }
}))

export default useStyles
