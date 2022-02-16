import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  modal: {
    height: '100vh'
  },
  root: {
    background: colors.invariant.component,
    width: 340,
    borderRadius: 10,
    margin: '10% auto ',
    padding: '10px 15px 20px 15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    color: colors.white.main,
    ...typography.body1
  },
  desc: {
    ...typography.body3,
    lineHeight: '16px',
    color: colors.invariant.textGrey,
    textAlign: 'center',
    padding: 8
  },
  buttons: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 17
  },
  buttonCancel: {
    backgroundColor: colors.invariant.light,
    borderRadius: 10,
    color: colors.invariant.dark,
    width: 120,
    ...typography.body1,
    textTransform: 'capitalize',
    padding: '3px 16px'
  },
  buttonClaim: {
    backgroundColor: 'rgba(46, 224, 154, 0.8)',
    borderRadius: 10,
    color: colors.invariant.dark,
    width: 120,
    ...typography.body1,
    textTransform: 'capitalize',
    padding: '3px 16px',
    '&:hover': {
      backgroundColor: colors.invariant.green
    }
  }
}))

export default useStyles
